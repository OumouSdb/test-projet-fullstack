describe('NotFoundComponent', () => {
    it('should display "Page not found', () => {
        cy.visit('/bad-url')
        cy.contains('Page not found !').should('be.visible');
    });
});