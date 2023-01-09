import startPage from '../support/pages/household/start'

describe('Validations for zipcode', () => {
    beforeEach(() => {
        cy.visit('/')
    })
    it('should not accept a zipcode with less than 4 digits', () => {
        startPage.fillHouseholdData('2', '0002')
        startPage.evaluateReturnMessage('#invalidZipNum', 'Please enter a valid five-digit ZIP Code.')
    })
    it('should not accept a zipcode with more than 4 digits', () => {
        startPage.fillHouseholdData('2', '1000002')
        startPage.evaluateReturnMessage('#invalidZipNum', 'Please enter a valid five-digit ZIP Code.')
    })
    it('should not accept a blank zipcode', () => {
        startPage.submit('2', ' ')
        startPage.evaluateReturnMessage('#invalidZipNum', 'Please enter a valid five-digit ZIP Code.')
    })
    it('should not accept a zipcode with 4 digits but not in the database', () => {
        startPage.fillHouseholdData('2', '00001')
        startPage.evaluateReturnMessage('#invalidZip', 'We could not find your ZIP code in our database. Please try again, or you may continue using the calculator with a default value. Using the default will give you average estimates.')
    })
})