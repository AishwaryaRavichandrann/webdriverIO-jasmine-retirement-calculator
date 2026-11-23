//import { expect } from '@wdio/globals'

import retirementData from '../testdata/retirementCalculator.data.json'
import retirementCalculatorPage from '../pageobjects/retirementCalculator.page.ts'

const invalidAgeScenarios = [
    retirementData.invalidAgeData.retirementAgeLessThanCurrentAge,
    retirementData.invalidAgeData.retirementAgeEqualToCurrentAge ]
    

describe('Retirement Calculator', () => {


    beforeEach(async () => {
        console.log('===== Test Started =====')
        await retirementCalculatorPage.open()
        await retirementCalculatorPage.cookiesAction()

    })

    it('should submit the form with mandatory fields', async () => {        
        console.log('===== Filling Mandatory Fields =====')

        await retirementCalculatorPage.fillMandatoryFields(retirementData.validData)
        await retirementCalculatorPage.clickCalculate()
        const results = await retirementCalculatorPage.getResults()
        expect(results.header).toBe('Results')
        


    })    

    it('should submit the form with all the fields', async () => {

        console.log('===== Filling All Fields =====')

        await retirementCalculatorPage.fillAllFields(retirementData.validData)
        await retirementCalculatorPage.clickCalculate()
        const results = await retirementCalculatorPage.getResults()
        expect(results.header).toBe('Results')
       
    
    })

    it('should display and hide additional fields when Social Security Benefits is toggled', async() => {
        console.log('===== Toggling Social Security Benefits =====')
        await retirementCalculatorPage.selectSocialSecurity('Yes')
        await expect(retirementCalculatorPage.socialSecurityOverrideAmount).toBeDisplayed()
        await retirementCalculatorPage.selectSocialSecurity('No')
        await expect(retirementCalculatorPage.socialSecurityOverrideAmount).not.toBeDisplayed()
    })

    it('should calculate retirement results using default calculator values', async () => {
        console.log('===== Calculating Retirement Results with Default Values =====')
        await retirementCalculatorPage.fillAllFields(retirementData.validData)
        await retirementCalculatorPage.defaultCalculatorValues(retirementData.validData)
        await retirementCalculatorPage.clickCalculate()
        const results = await retirementCalculatorPage.getResults()
        expect(results.header).toBe('Results')
    
    })

    //Tool Tip 

    it('should display correct tooltip content for Savings Increase Rate', async () => {
        console.log('===== Checking Tooltip Content for Savings Increase Rate =====')
        const tooltipText = await retirementCalculatorPage.getSavingsIncreaseRateTooltipText()
        expect(tooltipText).toContain('Recommended value 2%')
        expect(tooltipText).toContain('Range 0% to 10%')

    })

    //Clear Form
    it('should clear the form when the reset button is clicked', async () => {
        console.log('===== Clearing the Form =====')
        await retirementCalculatorPage.fillMandatoryFields(retirementData.validData)
        await retirementCalculatorPage.clickClearForm()
        await expect(retirementCalculatorPage.currentAge).toHaveValue('')
        await expect(retirementCalculatorPage.retirementAge).toHaveValue('')

    }) 

    //Negative Test Cases   

    invalidAgeScenarios.forEach((data) => {

    it(`should display error message when current age ${data.currentAge} less than or equal to retirement age ${data.retirementAge}`, async () => {
        console.log('===== Filling Mandatory Fields with Invalid Age Scenarios =====')
        await retirementCalculatorPage.fillMandatoryFields(data)
        await retirementCalculatorPage.clickCalculate()
        await expect( retirementCalculatorPage.retirementAgeValidationMessage).toHaveText(
            'Planned retirement age must be greater than current age'
        )
    })

    })

    it('should display error message when current age is not provided', async () => {
        console.log('===== Filling Mandatory Fields with Missing Current Age =====')
        await retirementCalculatorPage.fillMandatoryFields(
            retirementData.missingMandatoryFieldData.missingCurrentAge
        )
    
        await retirementCalculatorPage.clickCalculate() 
        await expect( retirementCalculatorPage.requiredFieldValidationMessage).toHaveText('Input required')
    })

          
})

