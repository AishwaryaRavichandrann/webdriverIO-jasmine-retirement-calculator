Retirement Savings Calculator - Automation Framework

Project Overview

    WebDriverIO + TypeScript automation framework developed to validate the Securian Retirement Savings Calculator

Automated Test Scenarios:

    Verify retirement calculation with valid mandatory fields
    Verify retirement calculation with all fields populated
    Verify Social Security Benefits toggle functionality
    Verify Clear Form functionality
    Verify validation message when retirement age is less than current age
    Verify validation message when retirement age is equal to current age
    Verify missing mandatory field validation

Observation:

 1) The tooltip for Pre-retirement Investment Return states a supported range of -12% to 12%.

During exploratory testing, entering -12 resulted in the field displaying 12, suggesting that negative values may not be accepted despite the TOOLTIP GUIDANCE.

As the expected behavior is not explicitly defined, this observation has been documented for clarification.

2) The Savings Increase Rate tooltip indicates a recommended range of 0% to 10%.

During exploratory testing, when a value greater than 10 (e.g., 11) is entered, the application accepts the input and displays/truncates the value to 1 instead of showing a validation message.

As the expected behavior was not explicitly defined, this has been documented as an observation rather than a defect.