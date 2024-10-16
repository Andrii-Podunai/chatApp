// // cypress/support/commands.js

Cypress.Commands.add('login', (username, password) => {
    cy.visit('http://localhost:3000/login');
    cy.get('[data-testid="username-input"]').type(username);
    cy.get('[data-testid="password-input"]').type(password);
    cy.get('[data-testid="login-button"]').click();
});
