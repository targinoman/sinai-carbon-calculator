it('should verify if the application is running', () => {
    cy.visit('/')
    cy.get(".page-title").should("be.visible")
})
