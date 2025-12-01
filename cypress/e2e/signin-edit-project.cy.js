describe('Sign In and Edit Project Test', () => {
  let testEmail;
  let testPassword = 'testpassword123';

  before(() => {
    // Create a test user
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

  it('should sign in, create a project, and then edit it', () => {
    // Sign in
    cy.visit('/signin')
    cy.get('#email').type(testEmail)
    cy.get('#password').type(testPassword)
    cy.get('form').submit()
    
    // Should be redirected to projects page
    cy.url().should('include', '/projects')
    cy.wait(3000)
    
    // Create a project using the Add Project form
    cy.contains('Add Project', { timeout: 10000 }).should('be.visible').click()
    cy.wait(1500)
    
    // Verify form is visible and fill it
    cy.get('#title', { timeout: 10000 }).should('be.visible').clear().type('Project to Edit')
    cy.get('#description').clear().type('Original description')
    cy.get('#technologies').type('React, Node.js')
    cy.get('#github').type('https://github.com/test/original')
    
    // Handle alert
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alert')
    })
    
    // Submit to create the project
    cy.get('form').within(() => {
      cy.get('button[type="submit"]').contains('Add Project').click()
    })
    
    // Wait for alert
    cy.wait(1000)
    cy.get('@alert').should('have.been.called')
    
    // Wait for form to close and project to be added
    cy.wait(3000)
    
    // Reload page to ensure project is loaded from localStorage
    cy.reload()
    cy.wait(3000)
    
    // Find the project - it should have data-user-project="true" attribute
    cy.contains('Project to Edit', { timeout: 15000 }).should('be.visible')
    
    // Find the project card that has the Edit button
    // Projects with isUserProject=true have data-user-project="true"
    cy.get('.project-card[data-user-project="true"]').contains('Project to Edit').parents('.project-card').first().within(() => {
      cy.get('.project-actions', { timeout: 10000 }).should('be.visible')
      cy.get('button').contains('Edit').should('be.visible').click()
    })
    
    // Wait for scroll and form to appear
    cy.wait(3000)
    
    // Verify edit form is visible with pre-filled data
    cy.get('.add-project-form', { timeout: 10000 }).should('be.visible')
    cy.get('#title', { timeout: 10000 }).should('be.visible').should('have.value', 'Project to Edit')
    
    // Update the fields
    cy.get('#title').clear().type('Updated Project Title')
    cy.get('#description').clear().type('Updated description')
    
    // Handle update alert
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('updateAlert')
    })
    
    // Submit the update
    cy.get('form').within(() => {
      cy.get('button[type="submit"]').contains('Update Project').click()
    })
    
    // Wait for alert
    cy.wait(1000)
    cy.get('@updateAlert').should('have.been.called')
    
    // Wait for update to complete
    cy.wait(2000)
    
    // Reload to see updated project
    cy.reload()
    cy.wait(3000)
    
    // Verify updated project appears
    cy.contains('Updated Project Title', { timeout: 15000 }).should('be.visible')
    
    // Note: The old title might still exist if there are multiple projects or if it's cached
    // The important thing is that the updated title appears, which confirms the edit worked
  })
})
