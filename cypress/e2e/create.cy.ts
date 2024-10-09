describe('Login and Create Session', () => {
    before(() => {
        cy.login();
    });

    it('should create and save a session', () => {
        cy.intercept('GET', '/api/user/1', {
            statusCode: 200,
            body: {
                id: 1,
                name: "string",
                description: "string",
                date: new Date(),
                teacher_id: 2,
                users: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        }).as('getUser');

        cy.intercept('GET', '/api/teacher', {
            statusCode: 200,
            body: [
                { id: 1, firstName: 'Jane', lastName: 'Doe' },
                { id: 2, firstName: 'John', lastName: 'Dodo' }
            ]
        }).as('getTeachers');

        cy.intercept('POST', '/api/session', {
            statusCode: 200,
            body: {
                id: 3,
                name: 'Yoga',
                description: 'desc',
                date: '2023-10-29T00:00:00.000Z',
                teacher_id: 1,
                users: [],
                createdAt: '2024-10-10T00:00:00.000Z',
                updatedAt: '2024-10-10T00:00:00.000Z'
            }
        }).as('createSession');

        cy.get('button[routerLink="create"]').click();
        cy.url().should('include', '/create');
        cy.wait('@getTeachers');
        cy.get('input[formControlName="name"]').type('Yoga');
        cy.get('input[formControlName="date"]').type('2024-09-19');
        cy.get('mat-select[formControlName="teacher_id"]').click();
        cy.get('mat-option').contains('Jane Dodp').click();
        cy.get('textarea[formControlName="description"]').type('session.');
        cy.get('button[type="submit"]').click();
        cy.wait('@createSession');
        cy.url().should('include', '/sessions');
    });
});
