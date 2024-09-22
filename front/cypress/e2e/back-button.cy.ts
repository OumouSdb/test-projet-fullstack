describe('Back Button Functionality', () => {
    it('should go back to the previous page', () => {
        cy.visit('/');
        cy.visit('/login');

        // Simulation bouton retour
        cy.window().then((win) => {
            win.history.back();
        });
        cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
});