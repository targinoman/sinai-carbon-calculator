class Creator {

    generateBill() {
        let num = Math.floor(Math.random() * 1000)
        return num.toString()
    }

    addCommas(num) {
        num = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return num
    }

    removeCommas(number) {
        return number.toString().replace(/,/g, '');
    }

    calculateGasEmission(naturalGasBill) {
        let naturalGasEmission = Math.round((naturalGasBill / 10.68) * 119.58 * 12)
        return this.addCommas(naturalGasEmission)
    }

    calculateElectricityEmission(electricityBill) {
        let electricityEmission = Math.round((electricityBill / 0.1188) * 0.4501044 * 12)
        return this.addCommas(electricityEmission)
    }

    calculateFuelOilEmission(fuelOilBill) {
        let fuelOilEmission = Math.round((fuelOilBill / 4.02) * 22.61 * 12)
        return this.addCommas(fuelOilEmission)
    }

    calculatePropaneEmission(propaneBill) {
        let propaneEmission = Math.round((propaneBill / 2.47) * 12.43 * 12)
        return this.addCommas(propaneEmission)
    }

    generateNumber(param) {
        let num = Math.floor(Math.random() * param)
        return num.toString()
    }

    calculateThermostatIncreaseDollarSavings(electricityBill, thermostatIncrease) {
        let result = Math.round(electricityBill * 0.14 * 0.06 * thermostatIncrease * 12)
        return this.addCommas(result)
    }

    calculateThermostatIncreaseReductions(electricityEmission, thermostatIncrease) {
        let result = Math.round(this.removeCommas(electricityEmission) * 0.14 * 0.06 * thermostatIncrease)
        return this.addCommas(result)
    }

    calculateThermostatDecreaseDollarSavings(electricityBill, thermostatDecrease) {
        let result = Math.round(electricityBill * 0.09 * 1 * 0.03 * thermostatDecrease * 12)
        return this.addCommas(result)
    }

    calculateThermostatDecreaseReductions(electricityEmission, thermostatDecrease) {
        let result = Math.round(this.removeCommas(electricityEmission) * 0.09 * 0.03 * thermostatDecrease)
        return this.addCommas(result)
    }

    calculateLightsDollarSavings(lightsToReplace) {
        return lightsToReplace * 4
    }

    calculateLightsReductions(lightsToReplace) {
        return Math.round(lightsToReplace * 33 * 0.4501044)
    }

    calculateComputerPwrDollarSavings() {
        return Math.round(107.1 * 0.1188)
    }

    calculateComputerPwrReductions() {
        let result = Math.round(107.1 * 0.4501044)
        return this.addCommas(result)
    }

    calculateColdWaterDollarSavings(loads) {
        return Math.round(0.96 * 0.1188 * loads * 52)
    }

    calculateColdWaterReductions(loadsPerWeek) {
        let result = Math.round(0.96 * 52 * loadsPerWeek * 0.4501044)
        return this.addCommas(result)
    }

    calculateAirDryDollarSavings() {
        return Math.round(769 * 0.1188 * 1)
    }

    calculateAirDryReductions() {
        let result = Math.round(769 * 0.4501044 * 1)
        return this.addCommas(result)
    }

    calculateFridgeDollarSavings(){
        return Math.round(322 * 0.1188)
    }

    calculateFridgeReductions() {
        let result = Math.round(322 * 0.4501044)
        return this.addCommas(result)
    }

    calculateWindowDollarSavings() {
        return 150
    }

    calculateWindowReductions () {
        let result = Math.round(0.4501044*(25210000 / 3412))
        return this.addCommas(result)
    }

}

export default new Creator()