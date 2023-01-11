import creator from '../fixtures/creator'
export class Vehicle {

    constructor(name) {
        this.avgMiles = creator.generateNumber(20000)
        this.avgGasMileage = creator.generateNumber(40)
        this.name = name
    }

    calculateEmissions(avgMiles, avgGasMileage) {
        let result = Math.round(avgMiles / avgGasMileage * 19.6 * 1.013684744044602)
        return creator.addCommas(result)
    }

    calculateEmissionsWithoutMaintenance(avgMiles, avgGasMileage) {
        let result = Math.round(avgMiles / avgGasMileage * 19.6 * 1.013684744044602 * 1.04)
        return creator.addCommas(result)
    }

    static calculateDollarSavings(vehicles) {
        let total = 0
        vehicles.forEach(function (vehicle) {
            total += Math.round(vehicle.avgMiles / vehicle.avgGasMileage * 3.68)
        })
        return creator.addCommas(Math.round(total * 0.07))
    }

    static calculateReductions(vehicles) {
        let total = 0
        vehicles.forEach(function (vehicle) {
            total += Math.round(vehicle.avgMiles / vehicle.avgGasMileage * 19.6 * 1.013684744044602 * 1.04)
        })
        return creator.addCommas(Math.round(total * 0.072))
    }

}