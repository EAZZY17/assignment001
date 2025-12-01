describe('Sign In and Add Project Test', () => {
  let testEmail;
  let testPassword = 'testpassword123';

  before(() => {
    // Create a test user first
    testEmail = `testuser${Date.now()}@example.com`;
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/users',
      body: {
        firstName: 'Test',
        lastName: 'User',
        email: testEmail,
        password: testPassword
      }
    });
  });

  it('should sign in and add a project', () => {
    // Sign in
    cy.visit('/signin')
    cy.get('#email').type(testEmail)
    cy.get('#password').type(testPassword)
    cy.get('form').submit()
    
    // Should be redirected to projects page
    cy.url().should('include', '/projects')
    
    // Wait for projects to load
    cy.wait(1000)
    
    // Click Add Project button
    cy.contains('Add Project').click()
    
    // Fill in project form
    cy.get('#title').type('Cypress Test Project')
    cy.get('#description').type('This is a test project created by Cypress')
    cy.get('#technologies').type('React, Node.js, MongoDB')
    cy.get('#github').type('https://github.com/test/test-project')
    cy.get('#role').type('Full Stack Developer')
    cy.get('#outcome').type('Successfully created a test project')
    
    // Submit the form
    cy.get('form').submit()
    
    // Should see success message or project in list
    cy.contains('Cypress Test Project').should('exist')
  })
})

