describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.createUser({
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    });
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
      cy.login({ username: 'mluukkai', password: 'salainen' });
    });

    it('A blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#title-input').type('A New World');
      cy.get('#author-input').type('Aladdin');
      cy.get('#url-input').type('night.com');
      cy.contains('create').click();

      cy.get('.general-blog').contains('A New World by Aladdin');
      cy.get('.success').contains('A New World by Aladdin added');
    });

    describe('After a blog is created', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'A New World',
          author: 'Aladdin',
          url: 'night.com',
        });
      });

      it('A blog can be liked', function () {
        cy.contains('view').click();
        cy.contains('like').click();
        cy.contains('likes 1');
      });

      it('A blog can be deleted', function () {
        cy.contains('view').click();
        cy.contains('remove').click();
        cy.get('.success').contains('A New World by Aladdin deleted');
      });

      it('A blog cannot be deleted by other user', function () {
        cy.contains('logout').click();
        cy.createUser({
          name: 'Dummy Mcdumbdumb',
          username: 'dummy',
          password: 'dumb123',
        });
        cy.login({ username: 'dummy', password: 'dumb123' });

        cy.contains('new blog').click();
        cy.contains('view').click();
        cy.get('.blog').should('not.contain', 'remove');
      });

      it('Bloglist is sorted based on likes', function () {
        cy.createBlog({
          title: 'A New World 2',
          author: 'Aladdin 2',
          url: 'night2.com',
        });

        cy.contains('view').click();
        cy.contains('view').click();

        cy.contains('night2.com').contains('like').click();
        cy.reload();

        let blogs = [];
        cy.get('.blog-list')
          .children()
          .each(function ($el) {
            blogs.push($el.text());
          })
          .then(function () {
            expect(blogs).to.have.ordered.members([
              'A New World 2 by Aladdin 2view',
              'A New World by Aladdinview',
            ]);
          });
      });
    });
  });
});
