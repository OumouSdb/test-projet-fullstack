describe('End to End test with the Simpsons Yoga Adventure', () => {

    beforeEach(() => {
        cy.intercept('GET', '/api/teacher', {
            body: [
                { id: 1, firstName: 'Homer', lastName: 'Simpson' },
                { id: 2, firstName: 'Marge', lastName: 'Simpson' }
            ]
        }).as('getTeachers');

        cy.intercept('GET', '/api/teacher/1', {
            id: 1, firstName: 'Homer', lastName: 'Simpson'
        }).as('getTeacher');

        cy.intercept('GET', '/api/session', {
            body: [
                {
                    "id": 1,
                    "name": "Simpson Family Yoga",
                    "date": "2024-10-14T00:00:00.000+00:00",
                    "teacher_id": 1,
                    "description": "A family attempt at yoga led by Homer.",
                    "users": [],
                    "createdAt": "2024-10-01T11:30:09",
                    "updatedAt": "2024-10-10T16:42:27"
                }
            ]
        }).as('getSessions');

        cy.login()
    });

    it('should create a session where the Simpsons do yoga', () => {
        cy.contains('button', 'Create').click();
        cy.get('form').should('be.visible');

        cy.url().should('include', '/sessions/create');

        cy.intercept('POST', '/api/session', {
            body: {
                id: 3,
                name: "Simpson Yoga Session 2",
                date: "2024-11-01T00:00:00.000+00:00",
                teacher_id: 2,
                description: "A new attempt at yoga led by Marge.",
                users: [],
                createdAt: "2024-11-01T11:30:09",
                updatedAt: "2024-11-01T16:42:27"
            }
        }).as('createSession');

        cy.get('input[formControlName=name]').type("Simpson Yoga Session 2");
        cy.get('input[formControlName=date]').type(`2024-11-01`);
        cy.get('mat-select[formControlName=teacher_id]').click();
        cy.get('mat-option').contains('Marge Simpson').click();
        cy.get('textarea[formControlName=description]').type("A new attempt at yoga led by Marge.");

        cy.intercept('GET', '/api/session', {
            body:
            {
                id: 1,
                name: "Simpson Family Yoga",
                date: "2024-10-14T00:00:00.000+00:00",
                teacher_id: 1,
                description: "A family attempt at yoga led by Homer.",
                users: [],
                createdAt: "2024-10-01T11:30:09",
                updatedAt: "2024-10-10T16:42:27"
            }

        }).as('getUpdatedSessions');

        cy.contains('button', 'Save').click();

        cy.url().should('include', '/sessions');
        cy.get('.mat-snack-bar-container').should('contain', 'Session created !');
    });

    it('should let the admin (Bart) delete a session', () => {
        cy.intercept('DELETE', '/api/session/1', {
            statusCode: 200
        }).as('deleteSession');
        cy.intercept('GET', '/api/session', {
            body: [
                {
                    "id": 2,
                    "name": "Yoga Session Retry",
                    "date": "2024-10-14T00:00:00.000+00:00",
                    "teacher_id": 2,
                    "description": "Retry led by Marge.",
                    "users": [],
                    "createdAt": "2024-10-01T11:30:09",
                    "updatedAt": "2024-10-10T16:42:27"
                }
            ]
        }).as('getSessionsAfterDelete');
        cy.intercept('GET', '/api/session/1', {
            body: {
                id: 1,
                name: "Simpson Family Yoga",
                date: "2024-10-14T00:00:00.000+00:00",
                teacher_id: 1,
                description: "A family attempt at yoga led by Homer.",
                users: [],
                createdAt: "2024-10-01T11:30:09",
                updatedAt: "2024-10-10T16:42:27"
            }
        }).as('sessionDetail');
        cy.get('button').contains('Detail').click();
        cy.get('button').contains('Delete').click();
        cy.get('.mat-snack-bar-container').should('contain', 'Session deleted !');
        cy.url().should('include', '/session');
    });


    it('should let the admin (Bart) update a session', () => {
        const sessionUpdated = {
            id: 1,
            name: "Simpsons Yoga Success",
            date: "2024-12-25T00:00:00.000+00:00",
            teacher_id: 1,
            description: "Finally, the Simpsons succeed at yoga!",
            users: [],
            createdAt: "2024-10-01T11:30:09",
            updatedAt: "2024-12-24T16:42:27"
        };

        cy.intercept('PUT', '/api/session/1', {
            statusCode: 200,
            body: sessionUpdated
        }).as('updateSession');

        cy.intercept('GET', '/api/session', {
            body: [
                sessionUpdated,
                {
                    "id": 2,
                    "name": "Yoga Session Retry",
                    "date": "2024-10-14T00:00:00.000+00:00",
                    "teacher_id": 2,
                    "description": "Retry led by Marge.",
                    "users": [],
                    "createdAt": "2024-10-01T11:30:09",
                    "updatedAt": "2024-10-10T16:42:27"
                }
            ]
        }).as('getUpdatedSessions');

        cy.intercept('GET', '/api/session/1', {
            body: {
                id: 1,
                name: "Simpson Family Yoga",
                date: "2024-10-14T00:00:00.000+00:00",
                teacher_id: 1,
                description: "A family attempt at yoga led by Homer.",
                users: [],
                createdAt: "2024-10-01T11:30:09",
                updatedAt: "2024-10-10T16:42:27"
            }
        }).as('sessionDetail');
        cy.get('button').contains('Edit').click();
        cy.get('input[formControlName=name]').clear().type("Simpsons Yoga Success");
        cy.get('input[formControlName=date]').clear().type(`2024-12-25`);
        cy.get('mat-select[formControlName=teacher_id]').click();
        cy.get('mat-option').contains('Homer Simpson').click();
        cy.get('textarea[formControlName=description]').clear().type("Finally, the Simpsons succeed at yoga!");
        cy.get('button').contains('Save').click();
    });


    it('should display login and register buttons when user is not logged in', () => {
        cy.visit('/');
        cy.contains('Login').should('be.visible');
        cy.contains('Register').should('be.visible');
    });

    it('should allow user to navigate to account /me and display user information', () => {
        cy.intercept('GET', '/api/user/1', {
            statusCode: 200,
            body: {
                id: 1,
                firstName: 'Bart',
                lastName: 'Simpson',
                email: 'bart.simpson@test.com',
                admin: true,
                createdAt: '2000-06-14T00:00:00Z',
                updatedAt: '2024-10-10T00:00:00Z'
            }
        }).as('getUser');

        cy.get('span[routerLink="me"]').click();

        cy.wait('@getUser', { timeout: 10000 });

        cy.url().should('include', '/me');

        cy.get('p').contains('Name: Bart SIMPSON');
        cy.get('p').contains('Email: bart.simpson@test.com');
        cy.get('p').contains('Create at: June 14, 2000');
        cy.get('p').contains('Last update: October 10, 2024');
        cy.get('p').contains('You are admin');
    });

    it('should display "Page not found !" when navigating to an unknown route', () => {
        cy.visit('/unknown-route', { failOnStatusCode: false });
        cy.get('h1').should('contain', 'Page not found !');
        cy.get('.flex.justify-center').should('be.visible');
    });
});
