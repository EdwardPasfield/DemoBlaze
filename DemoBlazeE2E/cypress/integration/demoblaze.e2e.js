describe("Add To Cart", function () {
  beforeEach(() => {
    cy.visit("/");
    cy.intercept("GET", "**/index**").as("loginModalLoad");
    cy.intercept("GET", "**/entries").as("productLoad");
    cy.intercept("GET", "**/view").as("cartContentLoad");
    cy.intercept("POST", "**/view").as("productPageLoad");
    cy.intercept("POST", "**/check").as("loginDetailCheck");
    cy.intercept("POST", "**/pagination").as("paginationLoad");
    cy.intercept("POST", "**/deletecart").as("deleteCart");
    cy.fixture("users.json").then((data) => {
      cy.simpleLogin(data.user, data.password);
    });
  });

  it("Add product to cart", function () {
    // If more time I would have added a command which makes sure cart is empty here.
    const name = "Edward Pasfield";
    const country = "England";
    const city = "Bath";
    const card = "1234 1234 1234 1234";
    const month = "June";
    const year = "2021";
    // Assert Side Navigation Works
    cy.get(".list-group-item").contains("Laptop").click();
    // Find and visit Sony Vaio i7 Page and add to cart
    cy.get(".card-title").contains("Sony vaio i7").click();
    cy.wait("@productPageLoad");
    cy.get(".btn:visible").contains("Add to cart").click();
    // Go back home
    cy.get("#navbarExample").contains("Home").click();
    cy.wait(["@productLoad", "@productLoad", "@productLoad"]);
    // Click next page button
    cy.get("#next2").should("be.visible").click();
    cy.wait("@paginationLoad");
    // Find and visit ASUS Full HD Page and add to cart
    cy.get(".card-title").contains("ASUS Full HD").click();
    cy.wait("@productPageLoad");
    cy.get(".btn:visible").contains("Add to cart").click();
    // Visit Cart
    cy.get("#cartur").click();
    cy.wait(["@productPageLoad", "@productPageLoad"]);
    cy.get("#totalp").then((price) => {
      const val = price.text();
      cy.log("val");
      // Click Place Order
      cy.get(".col-lg-1 > .btn").click();
      // Wait to fix modal inconsistency (necessary)
      cy.wait(1000);
      // Enter information (There is no validation on these fields)
      cy.get("#name").type(name);
      cy.get("#country").type(country);
      cy.get("#city").type(city);
      cy.get("#card").type(card);
      cy.get("#month").type(month);
      cy.get("#year").type(year);
      cy.get("#orderModal .btn-primary").click();
      // Assert order placed correctly
      cy.get(".sweet-alert")
        .should("be.visible")
        // Asserts name, card number and total price is correct.
        .contains(name)
        .contains(card)
        .contains(val);
      cy.wait("@deleteCart");
      cy.get(".sa-success");
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      // Bad practice however the modal is very tempramental (as are all the modals tbh)
      cy.wait(1000);
      cy.get(".confirm").click();
    });
    // Assert Home page load
    cy.get("#narvbarx").should("be.visible");
  });
  // A Logout After() would be useful if the system were to allow it, This is being limited by current functionality of the page
  // A report (mochawesome) would be useful if there was more than just one test.
});
