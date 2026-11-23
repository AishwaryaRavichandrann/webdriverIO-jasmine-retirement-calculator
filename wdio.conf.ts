import allureReporter from '@wdio/allure-reporter'
import fs from 'fs'

export const config: WebdriverIO.Config = {
    
    runner: 'local',
    tsConfigPath: './tsconfig.json',
    baseUrl: 'https://www.securian.com',
   
    specs: ['./test/specs/**/*.ts'],       
        
    maxInstances: 10,    
    capabilities: [{  browserName: 'chrome'}],
    logLevel: 'info',    
   
    bail: 0,
    
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,    
    connectionRetryCount: 3,    
    framework: 'jasmine',
    
  
    reporters: [['allure', {outputDir: 'allure-results',
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: true
    }]],

    before: async () => {
        await browser.maximizeWindow();
    },

    // afterTest: async function (test,{passed}) {
    //     if (!passed) {
            
    //         const screenshot = await browser.takeScreenshot();

    //         allureReporter.addAttachment(
    //             `${test.title}-Failure-${Date.now()}`,
    //             Buffer.from(screenshot, 'base64'),
    //             'image/png'
    //         );

    //     }
    // },
    
    afterTest: async function (test,  { passed }) {
    const screenshot = await browser.takeScreenshot()

    allureReporter.addAttachment(
        `${test.description}-${passed ? 'PASSED' : 'FAILED'}-${Date.now()}`,
        Buffer.from(screenshot, 'base64'),
        'image/png'
    )
    },

    onPrepare: () => {
        if (fs.existsSync('./allure-results')) {
            fs.rmSync('./allure-results', {
                recursive: true,
                force: true
            });
        }

        if (fs.existsSync('./allure-report')) {
            fs.rmSync('./allure-report', {
                recursive: true,
                force: true
            });
        }
    },

    
    jasmineOpts: {
       
        defaultTimeoutInterval: 60000,
        expectationResultHandler: function(_passed, _assertion) {
            // do something
        }
    },
 
}