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

    it('should calculate carbon footprint and give reduction suggestions', function () {
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

      cy.goTo('#view-full-report')

      cy.isLoaded('Your Household Carbon Footprint Report')
      cy.validateEmissions('.totalEmissions', '53,893')
      cy.validateEmissions('.newEmissionTotal', '46,206')
      cy.validateEmissions('.uS_avg', '53,585')

      cy.get('#good-work-msg').should('contain.text', 'Emissions are lower than the U.S. average.')
      cy.get('.gallonsOfGasSavings').should('contain.text', '392')
      cy.get('.treeSavings').should('contain.text', '89')
      cy.get('.wasteSavings').should('contain.text', '2,479')
      cy.get('.x500emissions').should('contain.text', '3,843,582')
      cy.get('.gasx500').should('contain.text', '196,101')
      cy.get('.heat-energy-dollars-saved').should('contain.text', '72')
      cy.get('.ac-energy-dollars-saved').should('contain.text', '24')
      cy.get('.ac-energy-co2-saved').should('contain.text', '90')
      cy.get('.lightEnergyDollarsSaved').should('contain.text', '32')
      cy.get('.lightEnergyCo2Saved').should('contain.text', '119')
      cy.get('.computerPwrDollarsSaved').should('contain.text', '13')
      cy.get('.computerPwrCo2Saved').should('contain.text', '48')
      cy.get('.coldWaterDollarsSaved').should('contain.text', '18')
      cy.get('.coldWaterCo2Saved').should('contain.text', '67')
      cy.get('.airDryDollarsSaved').should('contain.text', '46')
      cy.get('.airDryCo2Saved').should('contain.text', '173')
      cy.get('.fridgeDollarsSaved').should('contain.text', '38')
      cy.get('.fridgeCo2Saved').should('contain.text', '145')
      cy.get('.furnaceDollarsSaved').should('contain.text', '78')
      cy.get('.furnaceCo2Saved').should('contain.text', '728')
      cy.get('.windowDollarsSaved').should('contain.text', '150')
      cy.get('.windowCo2Saved').should('contain.text', '2,947')
      cy.get('.increaseGreenPwrCo2Saved').should('contain.text', '1,070')
      cy.get('.maintenanceDollarsSaved').should('contain.text', '26')
      cy.get('.maintenanceCo2Saved').should('contain.text', '142')
      cy.get('.reduceMilesVehicle1Dollars').should('contain.text', '0')
      cy.get('.reduceMilesVehicle1Co2').should('contain.text', '1')
      cy.get('.replaceVehicle1Dollars').should('contain.text', '0')
      cy.get('.replaceVehicle1Co2').should('contain.text', '2')
      cy.get('.reduceMilesVehicle2Dollars').should('contain.text', '102')
      cy.get('.reduceMilesVehicle2Co2').should('contain.text', '277')
      cy.get('.replaceVehicle2Dollars').should('contain.text', '190')
      cy.get('.replaceVehicle2Co2').should('contain.text', '1,027')
      cy.get('.wasteWillSave').should('contain.text', '51')
      cy.get('#will-do-dollar-total').should('contain.text', '789')
      cy.get('#will-do-exhaust-total').should('contain.text', '7,687')
      cy.get('.wasteAlreadySaved').should('contain.text', '250')
      cy.get('#already-do-dollar-total').should('contain.text', '0')
      cy.get('#already-do-exhaust-total').should('contain.text', '250')

    })
  })
})