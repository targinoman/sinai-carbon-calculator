class TransportationPage {
    fillTransportationForm(data) {
        cy.selectOption('#numVehiclesInput', data.transportation.numVehiclesInput)
        cy.selectOption('#maintCurrentSelect', data.transportation.maintCurrentSelect)
        cy.get('#vehicle1Miles').type(data.transportation.vehicle1Miles)
        cy.get('#vehicle1GasMileage').type(data.transportation.vehicle1GasMileage)
        cy.get('#vehicle2Miles').type(data.transportation.vehicle2Miles)
        cy.selectOption('#vehicle2Select', data.transportation.vehicle2Select)
        cy.get('#vehicle2GasMileage').type(data.transportation.vehicle2GasMileage)
        cy.selectOption('#maintReduceSelect', data.transportation.maintReduceSelect)
        cy.get('#reduceMilesInput1').type(data.transportation.reduceMilesInput1)
        cy.get('#replaceVehicleInput1').type(data.transportation.replaceVehicleInput1)
        cy.get('#reduceMilesInput2').type(data.transportation.reduceMilesInput2)
        cy.selectOption('#reduceMilesSelect2', data.transportation.reduceMilesSelect2)
        cy.get('#replaceVehicleInput2').type(data.transportation.replaceVehicleInput2)
    }

    fillVehicleInfo(vehicleName, miles, mileage){
        cy.get(`#${vehicleName}Miles`).type(miles)
        cy.get(`#${vehicleName}GasMileage`).type(mileage)
    }

    validateVehicleEmissions(vehicleName, pounds) {
        cy.get(`.${vehicleName}Co2`).should('contains.text', pounds)
    }

    validateDollarSavings(locator, dollarSavings){
        cy.get(locator).should('contains.text', dollarSavings)
    }

    validateReductions(locator, co2Reductions){
        cy.get(locator).should('contains.text', co2Reductions)
    }
}

export default new TransportationPage()