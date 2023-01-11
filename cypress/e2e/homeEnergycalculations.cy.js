import startPage from '../support/pages/household/start'
import homeEnergyPage from '../support/pages/homeEnergy/homeEnergy'
import creator from '../fixtures/creator'

describe('Validate home energy calculations', function () {
    
    context('When user fills home energy data', function () {

        const naturalGasBill = creator.generateNumber(1000)
        const naturalGgasEmission = creator.calculateGasEmission(naturalGasBill)
        const electricityBill = creator.generateNumber(1000)
        const electricityEmission = creator.calculateElectricityEmission(electricityBill)
        const fuelOilBill = creator.generateNumber(1000)
        const fuelOilEmission = creator.calculateFuelOilEmission(fuelOilBill)
        const propaneBill = creator.generateNumber(1000)
        const propaneEmission = creator.calculatePropaneEmission(propaneBill)

        before(function () {
            cy.visit('/')
            startPage.fillHouseholdData('2', '00002')
        })

        it('should display the correct estimations of pounds of CO2/year', function () {

            homeEnergyPage.selectPrimaryHeatingSource('Electricity')
            homeEnergyPage.fillField('#naturalGasTextInput', naturalGasBill)
            homeEnergyPage.validatePoundsYear('naturalGas', naturalGgasEmission)
            homeEnergyPage.fillField('#electricityTextInput', electricityBill)
            homeEnergyPage.validatePoundsYear('electricity', electricityEmission)
            homeEnergyPage.fillField('#fuelTextInput', fuelOilBill)
            homeEnergyPage.validatePoundsYear('fuel', fuelOilEmission)
            homeEnergyPage.fillField('#propaneTextInput', propaneBill)
            homeEnergyPage.validatePoundsYear('propane', propaneEmission)

        })
    })
    context('When user selects reduction measures', function () {

        const naturalGasBill = creator.generateNumber(1000)
        const electricityBill = creator.generateNumber(1000)
        const electricityEmission = creator.calculateElectricityEmission(electricityBill)
        const fuelOilBill = creator.generateNumber(1000)
        const propaneBill = creator.generateNumber(1000)

        const thermostatIncrease = creator.generateNumber(10)
        const thermostatIncreaseDollarSavings = creator.calculateThermostatIncreaseDollarSavings(electricityBill, thermostatIncrease)
        const thermostatIncreaseReductions = creator.calculateThermostatIncreaseReductions(electricityEmission, thermostatIncrease)
        const thermostatDecrease = creator.generateNumber(10)
        const thermostatDecreaseDollarSavings = creator.calculateThermostatDecreaseDollarSavings(electricityBill, thermostatDecrease)
        const thermostatDecreaseReductions = creator.calculateThermostatDecreaseReductions(electricityEmission, thermostatDecrease)
        const lightsToReplace = creator.generateNumber(10)
        const lightsDollarSavings = creator.calculateLightsDollarSavings(lightsToReplace)
        const lightsReductions = creator.calculateLightsReductions(lightsToReplace)

        const computerPwrDollarSavings = creator.calculateComputerPwrDollarSavings()
        const computerPwrReductions = creator.calculateComputerPwrReductions()

        const greenPower = creator.generateNumber(20)

        const loadsPerWeek = creator.generateNumber(5)
        const coldWaterDollarsSavings = creator.calculateColdWaterDollarSavings(loadsPerWeek)
        const coldWaterReductions = creator.calculateColdWaterReductions(loadsPerWeek)
        const airDryDollarSavings = creator.calculateAirDryDollarSavings()
        const airDryReductions = creator.calculateAirDryReductions()

        const fridgeDollarsSavings = creator.calculateFridgeDollarSavings()
        const fridgeReductions = creator.calculateFridgeReductions()

        const windowDollarsSavings = creator.calculateWindowDollarSavings()
        const windowReductions = creator.calculateWindowReductions()

        before(function () {
            cy.visit('/')
            startPage.fillHouseholdData('2', '00002')
        })

        it.only('should display the correct estimations of annual savings', function () {
            cy.selectOption('#primaryHeatingSource', 'Electricity')
            homeEnergyPage.fillField('#naturalGasTextInput', naturalGasBill)
            homeEnergyPage.fillField('#electricityTextInput', electricityBill)
            homeEnergyPage.fillField('#fuelTextInput', fuelOilBill)
            homeEnergyPage.fillField('#propaneTextInput', propaneBill)
            
            homeEnergyPage.fillField('#energyAC', thermostatIncrease)
            homeEnergyPage.validateDollarSavings('.ac-energy-dollars-saved', thermostatIncreaseDollarSavings)
            homeEnergyPage.validateReductions('.ac-energy-co2-saved', thermostatIncreaseReductions)

            homeEnergyPage.fillField('#energyHeat', thermostatDecrease)
            homeEnergyPage.validateDollarSavings('.heat-energy-dollars-saved', thermostatDecreaseDollarSavings)
            homeEnergyPage.validateReductions('.heat-energy-co2-saved', thermostatDecreaseReductions)

            homeEnergyPage.fillField('#lightsToReplace', lightsToReplace)
            homeEnergyPage.validateDollarSavings('.lightEnergyDollarsSaved', lightsDollarSavings)
            homeEnergyPage.validateReductions('.lightEnergyCo2Saved', lightsReductions)

            cy.selectOption('#pwrMgmtSelect', 'Will Do')
            homeEnergyPage.validateDollarSavings('.computerPwrDollarsSaved', computerPwrDollarSavings)
            homeEnergyPage.validateReductions('.computerPwrCo2Saved', computerPwrReductions)

            homeEnergyPage.fillField('#increaseGreenInput', greenPower)

            cy.selectOption('#coldWaterSelect', 'Will Do')
            homeEnergyPage.fillField('#loadsPerWeek', loadsPerWeek)
            homeEnergyPage.validateDollarSavings('.coldWaterDollarsSaved', coldWaterDollarsSavings)
            homeEnergyPage.validateReductions('.coldWaterCo2Saved', coldWaterReductions)
            cy.selectOption('#AirDrySelect', 'Will Do')
            homeEnergyPage.validateDollarSavings('.airDryDollarsSaved', airDryDollarSavings)
            homeEnergyPage.validateReductions('.airDryCo2Saved', airDryReductions)

            cy.selectOption('#fridgeSelect', 'Will Do')
            homeEnergyPage.validateDollarSavings('.fridgeDollarsSaved', fridgeDollarsSavings)
            homeEnergyPage.validateReductions('.fridgeCo2Saved', fridgeReductions)
            

            cy.selectOption('#windowSelect', 'Will Do')
            homeEnergyPage.validateDollarSavings('.windowDollarsSaved', windowDollarsSavings)
            homeEnergyPage.validateReductions('.windowCo2Saved', windowReductions)
        })
    })
})