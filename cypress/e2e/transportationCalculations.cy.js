import { Vehicle } from '../fixtures/vehicle'
import startPage from '../support/pages/household/start'
import transportationPage from '../support/pages/transportation/transportation'

describe('Validate emission calculations', function () {
    context('When user fills vehicle information and does maintenance', function () {

        const vehicle1 = new Vehicle('vehicle1')
        const vehicle2 = new Vehicle('vehicle2')

        const vehicles = [vehicle1, vehicle2]

        before(function () {
            cy.visit('/')
            startPage.fillHouseholdData('2', '00002')
            cy.goTo('#to-transportation')
            cy.isLoaded('Transportation')
            cy.selectOption('#numVehiclesInput', '2')
            cy.selectOption('#maintCurrentSelect', 'Already Done')
        })

        it('should display the correct estimations of pounds of CO2/year', function () {
            vehicles.forEach(function (vehicle) {
                transportationPage.fillVehicleInfo(vehicle.name, vehicle.avgMiles, vehicle.avgGasMileage)
                transportationPage.validateVehicleEmissions(vehicle.name, vehicle.calculateEmissions(vehicle.avgMiles, vehicle.avgGasMileage))
            })
        })

    })

    context('When user fills vehicle information and does not do maintenance', function () {
        const vehicle1 = new Vehicle('vehicle1')
        const vehicle2 = new Vehicle('vehicle2')

        const vehicles = [vehicle1, vehicle2]

        before(function () {
            cy.visit('/')
            startPage.fillHouseholdData('2', '00002')
            cy.goTo('#to-transportation')
            cy.isLoaded('Transportation')
            cy.selectOption('#numVehiclesInput', '2')
            cy.selectOption('#maintCurrentSelect', 'Do Not Do')
        })
        it('should display the correct estimations of pounds of CO2/year', function () {
            vehicles.forEach(function (vehicle) {
                transportationPage.fillVehicleInfo(vehicle.name, vehicle.avgMiles, vehicle.avgGasMileage)
                transportationPage.validateVehicleEmissions(vehicle.name, vehicle.calculateEmissionsWithoutMaintenance(vehicle.avgMiles, vehicle.avgGasMileage))
            })
        })
    })
})

describe('Validate maintenance calculations', function (){
    context('When user fills vehicle information and will do maintenance', function () {
        const vehicle1 = new Vehicle('vehicle1')
        const vehicle2 = new Vehicle('vehicle2')

        const vehicles = [vehicle1, vehicle2]

        before(function () {
            cy.visit('/')
            startPage.fillHouseholdData('2', '00002')
            cy.goTo('#to-transportation')
            cy.isLoaded('Transportation')
            cy.selectOption('#numVehiclesInput', '2')
            cy.selectOption('#maintCurrentSelect', 'Do Not Do')
        })
        it.only('should display the correct estimations of dollar savings and CO2 reduction', function () {
            vehicles.forEach(function (vehicle) {
                transportationPage.fillVehicleInfo(vehicle.name, vehicle.avgMiles, vehicle.avgGasMileage)
            })
            cy.selectOption('#maintReduceSelect', 'Will Do')
            const dollarSavings = Vehicle.calculateDollarSavings(vehicles)
            transportationPage.validateDollarSavings('.maintReducDollarsSaved', dollarSavings)
            const reductions = Vehicle.calculateReductions(vehicles)
            transportationPage.validateReductions('.maintReducCo2Saved', reductions)
        })
    })
})