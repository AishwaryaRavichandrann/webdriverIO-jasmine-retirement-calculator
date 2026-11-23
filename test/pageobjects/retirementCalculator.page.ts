
class RetirementCalculatorPage {    
   
    get acceptCookies() { return $("//button[text()='Accept all cookies']") }

    get calculate() { return $("//button[text()='Calculate']") }

    get clearForm() { return $("//button[text()='Clear form']") }

    get adjustDefaultValues() { return $("//a[text()='Adjust default values']") }
    
    get saveDefaultValues() { return $("//button[text()='Save changes']") }

    // Basic Information
    get currentAge() { return $("#current-age") }

    get retirementAge() { return $("#retirement-age") }

    get currentIncome() { return $("#current-income") }

    get spouseIncome() {return $("#spouse-income") }
    
    get currentSavings() { return $("#current-total-savings")}

    get annualSavings() { return $("#current-annual-savings")}

    get savingsIncreaseRate() { return $("#savings-increase-rate") }

    get retirementAgeValidationMessage() { return $("#invalid-retirement-age-error") }

    get requiredFieldValidationMessage() { return $('#invalid-current-age-error'); }

    // Social Security
    get yesSocialSecurityBenefits() { return $("label[for='yes-social-benefits']")}

    get noSocialSecurityBenefits() { return $("label[for='no-social-benefits']") }

    get socialSecurityOverrideAmount() { return $("#social-security-override") }

    // Marital Status
    get maritalStatusMarried() { return $("label[for='married']") }

    get maritalStatusSingle() { return $("label[for='single']") }

    // Optional Calculator Fields
    get additionalIncome() { return $("#additional-income") }

    get retirementDuration() { return $("#retirement-duration") }

    get includeInflation() { return $("label[for='include-inflation']") }

    get excludeInflation() { return $("label[for='exclude-inflation']") }

    get retirementAnnualIncome() { return $("#retirement-annual-income") }

    get preRetirementReturn() { return $("#pre-retirement-roi") }

    get postRetirementReturn() { return $("#post-retirement-roi") }

    // Results
    
    get resultHeader() { return $("#calculator-results-container h3") }
    
    get resultMessage() { return $("#result-message") }

    get processingLoader() {return $('#calcSpinnerOnly-text')}

    get savingsIncreaseRateTooltipIcon() { return $('#savings-increase-rate-tooltip')}

    
    // Page Actions

    async open() {
        await browser.url('/insights-tools/retirement-calculator.html')
    
    }    

    async cookiesAction() {
        if (await this.acceptCookies.isExisting()) {
        await this.acceptCookies.click()
        }
    }

    // Reusuable functions 
    async enterValue(element: any, value: number) {
        await element.setValue(value)
    }

    async enterCurrencyValue(element: any, value: number) {
        await element.click()
        await browser.keys("END")
        await element.setValue(value)
    }

    async clickElement(element: any) {
        await element.click();
    }
    
        
    async isNoSocialSecuritySelected() {
        return await this.noSocialSecurityBenefits.isSelected()
    }

    async selectSocialSecurity(option: string) {
        console.log("Social Security Value =", option);
        if (option === "Yes") { await this.yesSocialSecurityBenefits.click() } 
        else { await this.noSocialSecurityBenefits.click() }
    }
    
    async selectMaritalStatus(status: string) {
        if (status === "Married") { await this.maritalStatusMarried.click() } 
        else { await this.maritalStatusSingle.click()}
    }

    async selectInflationOption(option: string) {
        if (option === "Yes") { await this.includeInflation.click() } 
        else { await this.excludeInflation.click() }
    }

    // Mandatory Fields
    async fillMandatoryFields(data: any) {

    await this.enterValue(this.currentAge, data.currentAge)
    await this.enterValue(this.retirementAge, data.retirementAge)
    await this.enterCurrencyValue(this.currentIncome,data.currentIncome)
    await this.enterCurrencyValue(this.currentSavings,data.currentSavings)
    await this.enterValue(this.annualSavings, data.savingsRate)
    await this.enterValue(this.savingsIncreaseRate, data.savingsIncreaseRate)
    await this.isNoSocialSecuritySelected() 
    
    }

    async clickCalculate() {
        await this.clickElement(this.calculate)
    }

    //Result Set
    async getResults() {

    await this.processingLoader.waitForDisplayed({ reverse: true, timeout: 30000})
        
    return {
        header: await this.resultHeader.getText(),
        message: await this.resultMessage.getText()
    }
    }

    // All fields
    async fillAllFields(data: any) {

    await this.fillMandatoryFields(data) 
    await this.enterCurrencyValue(this.spouseIncome, data.spouseIncome)
    await this.selectSocialSecurity(data.socialSecurityBenefits)    
    await this.selectMaritalStatus(data.maritalStatus)
    await this.enterCurrencyValue(this.socialSecurityOverrideAmount, data.socialSecurityOverrideAmount)        
   
    }

    async defaultCalculatorValues(data: any) {

    await this.clickElement(this.adjustDefaultValues)
    await this.enterCurrencyValue(this.additionalIncome, data.additionalIncome)
    await this.enterValue(this.retirementDuration, data.retirementDuration)
    await this.selectInflationOption(data.adjustForInflation)
    await this.enterCurrencyValue(this.retirementAnnualIncome, data.retirementAnnualIncome)
    await this.enterValue(this.preRetirementReturn,data.preRetirementReturn)
    await this.enterValue(this.postRetirementReturn, data.postRetirementReturn)
    await this.clickElement(this.saveDefaultValues)
    
    }

    // Clear Form
    async clickClearForm() {

        await this.clickElement(this.clearForm)
        
    }    

    async getSavingsIncreaseRateTooltipText() {
    
    await this.clickElement(this.savingsIncreaseRateTooltipIcon)
    return await this.savingsIncreaseRateTooltipIcon.getAttribute(
        'data-bs-content'
    )
    }
}
export default new RetirementCalculatorPage()