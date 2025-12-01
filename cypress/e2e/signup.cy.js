describe('Sign Up Test', () => {
  it('should successfully sign up a new user', () => {
    cy.visit('/signup')
    
    // Fill in the sign up form
    cy.get('#firstName').type('Test')
    cy.get('#lastName').type('User')
    cy.get('#email').type(`testuser${Date.now()}@example.com`)
    cy.get('#password').type('testpassword123')
    cy.get('#confirmPassword').type('testpassword123')
    
    // Submit the form
    cy.get('form').submit()
    
    // Should redirect to sign in page after successful sign up
    cy.url().should('include', '/signin')
  })
})

