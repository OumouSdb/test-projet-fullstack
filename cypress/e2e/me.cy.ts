describe('Login and Account Information', () => {
    before(() => {
        cy.login();
    });

    it('should allow user to navigate to account /me and display user information', () => {
        cy.intercept('GET', '/api/user/1', {
            statusCode: 200,
            body: {
                id: 1,
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                admin: false,
                createdAt: '2023-01-01T00:00:00Z',
                updatedAt: '2023-09-01T00:00:00Z'
            }
        }).as('getUser');

        cy.get('span[routerLink="me"]').click();

        cy.wait('@getUser', { timeout: 10000 });

        cy.url().should('include', '/me');

        cy.get('p').contains('Name: John DOE');
        cy.get('p').contains('Email: john.doe@test.com');
        cy.get('p').contains('Create at: june 14, 2000');
        cy.get('p').contains('Last update: October 10, 2024');
        cy.get('p').should('not.contain', 'You are admin');
    });
});
