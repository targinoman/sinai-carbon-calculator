import startPage from '../support/pages/household/start'
import homeEnergyPage from '../support/pages/homeEnergy/homeEnergy'
import transportationPage from '../support/pages/transportation/transportation'
import wastePage from '../support/pages/waste/waste'

describe('Carbon Footprint Calculator', () => {

  before(() => {
    cy.fixture('data').then(function (data) {
      this.data = data
    })
  })

  context('when user has all data to fill', () => {
    
    it('should calculate carbon footprint and give reduction suggestions', function() {
      cy.visit('/')

      startPage.isLoaded()
      startPage.fillHouseholdData(this.data.pplInHousehold, this.data.zipcode)

      //Home Energy
      cy.isLoaded('Home Energy')
      homeEnergyPage.fillHomeEnergyForm(this.data)
      cy.validateEmissions('.totalEmissions', '50,652')
      cy.validateEmissions('.newEmissionTotal', '44,463')

      cy.goTo('#to-transportation')

      //Transportation
      cy.isLoaded('Transportation')
      transportationPage.fillTransportationForm(this.data)
      cy.validateEmissions('.totalEmissions', '52,760')
      cy.validateEmissions('.newEmissionTotal', '45,124')

      cy.goTo('#to-waste')

      //Waste
      cy.isLoaded('Waste')

      wastePage.checkCurrentRecycling(this.data.waste.currentRecycling)
      wastePage.checkNewRecycling(this.data.waste.newRecycling)
      cy.validateEmissions('.totalEmissions', '53,893')
      cy.validateEmissions('.newEmissionTotal', '46,206')

      cy.wait(1000)
    })
  })
})