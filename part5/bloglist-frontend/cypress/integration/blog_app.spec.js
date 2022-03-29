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
      cy.get('.error').should('contain', 'Wrong credentials');
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username-input').type('mluukkai');
      cy.get('#password-input').type('salainen');
      cy.contains('login').click();
    });

    it('A blog can be created', function () {
      cy.contains('new note').click();
      cy.get('#title-input').type('A New World');
      cy.get('#author-input').type('Aladdin');
      cy.get('#url-input').type('night.com');
      cy.contains('create').click();
      cy.get('.general-blog').contains('A New World by Aladdin');
      cy.get('.success').contains('A New World by Aladdin added');
    });
  });
});
