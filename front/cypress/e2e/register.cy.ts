describe('Register spec', () => {
  it('Registration successful', () => {
    cy.visit('/register');

    // Intercepter la requête d'inscription
    cy.intercept('POST', '/api/auth/register', {
      statusCode: 200,
      body: {
        message: 'User registered successfully!'
      },
    }).as('registerUser');

    // Remplir le formulaire d'inscription
    cy.get('input[formControlName=firstName]').type('John');
    cy.get('input[formControlName=lastName]').type('Doe');
    cy.get('input[formControlName=email]').type('email@a.fr');
    cy.get('input[formControlName=password]').type('password123');

    // Soumettre le formulaire
    cy.get('form').submit();

    // Attendre que la requête d'inscription soit complétée
    cy.wait('@registerUser');

    // Vérifier que l'utilisateur est redirigé vers la page de connexion
    cy.url().should('include', '/login');
  });

  it('Shows error message on registration failure', () => {
    cy.visit('/register');

    // Intercepter la requête d'inscription pour simuler une erreur
    cy.intercept('POST', '/api/auth/register', {
      statusCode: 400,
      body: {
        message: 'Error: Email is already taken!'
      },
    }).as('registerUserError');

    // Remplir le formulaire d'inscription
    cy.get('input[formControlName=firstName]').type('John');
    cy.get('input[formControlName=lastName]').type('Doe');
    cy.get('input[formControlName=email]').type('email@a.fr');
    cy.get('input[formControlName=password]').type('password123');

    // Soumettre le formulaire
    cy.get('form').submit();

    // Attendre que la requête d'inscription soit complétée
    cy.wait('@registerUserError');

    // Vérifier que le message d'erreur s'affiche
    cy.get('.error').should('be.visible').and('contain', 'An error occurred');
  });
});
