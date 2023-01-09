import startPage from '../support/pages/household/start'
import homeEnergyPage from '../support/pages/homeEnergy/homeEnergy'
import transportationPage from '../support/pages/transportation/transportation'
import wastePage from '../support/pages/waste/waste'

describe('Carbon Footprint Calculator', () => {

  const data = {
    pplInHousehold: '2',
    zipcode: '00002',
    homeEnergy: {
      primaryHeatingSource: 'Natural Gas',
      naturalGasTextInput: '105.20',
      electricityTextInput: '117.65',
      fuelTextInput: '180.85',
      propaneTextInput: '314.00',
      energyAC: '2',
      energyHeat: '3',
      lightsToReplace: '8',
      pwrMgmtSelect: 'Will Do',
      increaseGreenInput: '20',
      coldWaterSelect: 'Will Do',
      loadsPerWeek: '3',
      AirDrySelect: 'Will Do',
      percentageAirDrySelect: '50% of my Laundry',
      fridgeSelect: 'Will Do',
      furnaceSelect: 'Will Do',
      windowSelect: 'Will Do'
    },
    transportation: {
      numVehiclesInput: '2',
      maintCurrentSelect: 'Do Not Do',
      vehicle1Miles: '14.263',
      vehicle1Select: 'Per Year',
      vehicle1GasMileage: '24.6',
      vehicle2Miles: '35.7',
      vehicle2Select: 'Per Week',
      vehicle2GasMileage: '18.3',
      maintReduceSelect: 'Will Do',
      reduceMilesInput1: '1.000',
      reduceMilesSelect1: 'Per Week',
      replaceVehicleInput1: '28.5',
      reduceMilesInput2: '10',
      reduceMilesSelect2: 'Per Week',
      replaceVehicleInput2: '37.3'
    },
    waste: {
      currentRecycling: [
        'aluminum',
        'plastic'
      ],
      newRecycling: [
        'glass'
      ]
    }
  }

  it('should calculate carbon footprint and give reduction suggestions', () => {
    cy.visit('/')
    
    startPage.isLoaded()
    startPage.fillHouseholdData(data.pplInHousehold, data.zipcode)
    
    //Home Energy
    cy.isLoaded('Home Energy')
    homeEnergyPage.fillHomeEnergyForm(data)
    cy.validateEmissions('.totalEmissions', '50,652')
    cy.validateEmissions('.newEmissionTotal', '44,463')
    
    cy.goTo('#to-transportation')

    //Transportation
    cy.isLoaded('Transportation')
    transportationPage.fillTransportationForm(data)
    cy.validateEmissions('.totalEmissions', '52,760')
    cy.validateEmissions('.newEmissionTotal', '45,124')
    
    cy.goTo('#to-waste')

    //Waste
    cy.isLoaded('Waste')
    
    wastePage.checkCurrentRecycling(data.waste.currentRecycling)
    wastePage.checkNewRecycling(data.waste.newRecycling)
    cy.validateEmissions('.totalEmissions', '53,893')
    cy.validateEmissions('.newEmissionTotal', '46,206')

    cy.wait(1000)
  })
})