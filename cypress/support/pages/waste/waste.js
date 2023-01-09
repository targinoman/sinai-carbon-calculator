class WastePage {

    checkCurrentRecycling(currentMaterials) {
        currentMaterials.forEach(function (currentMaterial) {
            cy.get(`#${currentMaterial}Checkbox`).click().should('be.checked')
        })
    }

    checkNewRecycling(newMaterials) {
        newMaterials.forEach(function (newMaterial) {
            cy.get(`#${newMaterial}CheckboxR`).click().should('be.checked')
        })
    }

}

export default new WastePage()