class HomeEnergy {
    fillHomeEnergyForm(data) {
        cy.get('#primaryHeatingSource').select(data.homeEnergy.primaryHeatingSource, { timeout: 30000 })
        cy.get('#naturalGasTextInput').type(data.homeEnergy.naturalGasTextInput)
        cy.get('#electricityTextInput').type(data.homeEnergy.electricityTextInput)
        cy.get('#fuelTextInput').type(data.homeEnergy.fuelTextInput)
        cy.get('#propaneTextInput').type(data.homeEnergy.propaneTextInput)
        cy.get('#energyAC').type(data.homeEnergy.energyAC)
        cy.get('#energyHeat').type(data.homeEnergy.energyHeat)
        cy.get('#lightsToReplace').type(data.homeEnergy.lightsToReplace)
        cy.selectOption('#pwrMgmtSelect', data.homeEnergy.pwrMgmtSelect)
        cy.get('#increaseGreenInput').type(data.homeEnergy.increaseGreenInput)
        cy.selectOption('#coldWaterSelect', data.homeEnergy.coldWaterSelect)
        cy.get('#loadsPerWeek').type(data.homeEnergy.loadsPerWeek)
        cy.selectOption('#AirDrySelect', data.homeEnergy.AirDrySelect)
        cy.selectOption('#percentageAirDrySelect', data.homeEnergy.percentageAirDrySelect)
        cy.selectOption('#fridgeSelect', data.homeEnergy.fridgeSelect)
        cy.selectOption('#furnaceSelect', data.homeEnergy.furnaceSelect)
        cy.selectOption('#windowSelect', data.homeEnergy.windowSelect)
    }

    fillField(locator, bill) {
        cy.get(locator).type(bill)
    }

    validatePoundsYear(source, pounds) {
        cy.get(`.${source} span`).should('contains.text', pounds)
    }

    validateDollarSavings(locator, dollarSavings){
        cy.get(locator).should('contains.text', dollarSavings)
    }

    validateReductions(locator, co2Eeductions){
        cy.get(locator).should('contains.text', co2Eeductions)
    }
}

export default new HomeEnergy()