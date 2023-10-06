describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Supervisor',
      username: 'admin',
      password: 'admin'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Checking for login form', function () {
    cy.contains('Login')
    cy.get('#username')
    cy.get('#password')
    cy.get('#login')
    cy.wait(1000)
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('admin')
      cy.get('#password').type('admin')
      cy.get('#login').click()
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('wrong')
      cy.get('#password').type('wrong')
      cy.get('#login').click()
      cy.contains('Username or password incorrect.')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('admin')
      cy.get('#password').type('admin')
      cy.get('#login').click()
      //cy.login({ username: 'admin', password: 'admin' })
    })

    it('A blog can be created', function () {
      cy.contains('New blog').click()
      cy.get('#title').type('Testing the Blog')
      cy.get('#author').type('Tester')
      cy.get('#url').type('www.test.com')
      cy.get('#submit').click()
      cy.wait(1250)
    })

    it('A blog can be liked', function () {
      cy.contains('New blog').click()
      cy.get('#title').type('Testing the Blog')
      cy.get('#author').type('Tester')
      cy.get('#url').type('www.test.com')
      cy.get('#submit').click()
      cy.contains('Show details').click()
      cy.contains('like').click()
      cy.contains('1')
    })

    it('A blog can be removed', function () {
      cy.contains('New blog').click()
      cy.get('#title').type('Testing the Blog')
      cy.get('#author').type('Tester')
      cy.get('#url').type('www.test.com')
      cy.get('#submit').click()
      cy.wait(2000)
      cy.visit('http://localhost:3000')
      cy.wait(2000)
      cy.contains('Show details').click()
      cy.contains('remove').click()
      cy.contains('remove').should('not.exist')
    })

    it('blogs are in right order', function () {
      cy.contains('New blog').click()
      cy.get('#title').type('First blog')
      cy.get('#author').type('zeus')
      cy.get('#url').type('www.zeus.com')
      cy.get('#submit').click()

      cy.contains('New blog').click()
      cy.get('#title').type('Second blog')
      cy.get('#author').type('zeus')
      cy.get('#url').type('www.google.com')
      cy.get('#submit').click()

      cy.get('.blog').eq(0).contains('button', 'Show details').click()
      cy.get('.like-button').filter(':visible').click()
      cy.contains('Hide').click()
      cy.wait(1250)
      cy.get('.blog').eq(1).contains('button', 'Show details').click()
      cy.get('.like-button').filter(':visible').click()
      cy.wait(1000)
      cy.get('.like-button').filter(':visible').click()
      cy.wait(100)
      cy.get('.blog').eq(0).should('contain', 'Second blog')
    })

  })
})