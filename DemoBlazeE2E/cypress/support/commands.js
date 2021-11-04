/// <reference types="Cypress" />

// -- Start of Command for simpleLogin --
Cypress.Commands.add("simpleLogin", function (login, pass) {
  cy.get("#login2").click();
  cy.wait("@loginModalLoad");
  // Modal being inconsistent so arbitrary wait to fix
  cy.wait(1000);
  cy.get("#loginusername").click().type(login).should("have.value", login);
  cy.get("#loginpassword").type(pass);
  cy.get("#logInModal .btn-primary:visible").click();
  cy.wait("@loginDetailCheck");
  cy.get("#nameofuser").contains(login).should("be.visible");
});
// -- End of Command for simpleLogin --
