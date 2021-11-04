/* eslint-disable no-unused-vars */
/// <reference types="Cypress" />

// Import commands.js using ES2015 syntax:
import "./commands";

// Error handling for errors that stop Cypress running tests
Cypress.on("uncaught:exception", (err, runnable) => false);
