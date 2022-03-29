describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.get('#login-form').should('be.visible');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username-input').type('mluukkai');
      cy.get('#password-input').type('salainen');
      cy.contains('login').click();
      cy.contains('logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username-input').type('mluukkai');
      cy.get('#password-input').type('wrong');
      cy.contains('login').click();
      cy.contains('Log in to application');
      cy.get('.error').contains('Wrong credentials');
    });
  });
});
