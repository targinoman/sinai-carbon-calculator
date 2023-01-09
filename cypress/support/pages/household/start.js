class StartPage {
    isLoaded() {
        cy.get('.page-title').should('be.visible')
    }

    fillHouseholdData(pplInHousehold, zipcode) {
        cy.get('#ppl-in-household-input').type(pplInHousehold)
        cy.get('#zip-code-input').type(zipcode)
        this.submit()
    }

    submit() {
        cy.get('#get-started').click()
    }

    evaluateReturnMessage(locator, returnMessage, timeout) {
        if (timeout) {
            cy.get(locator, { timeout: timeout })
                .should('be.visible', { timeout: timeout })
                .should('include.text', returnMessage)
        } else {
            cy.get(locator)
                .should('be.visible')
                .should('include.text', returnMessage)
        }
    }
}

export default new StartPage()