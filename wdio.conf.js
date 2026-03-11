'use strict';
const fs = require('fs');
const path = require('path');
const screenshotHelper = require('./helpers/screenshotHelper');

exports.config = {
    runner: 'local',

    specs: ['./tests/specs/**/*.spec.js'],
    exclude: [],

    maxInstances: 1,

    // Capabilities are set per platform config
    capabilities: [],

    logLevel: 'warn',
    bail: 0,
    waitforTimeout: 15000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 90000,
    },

    reporters: [
        'spec',
        [
            '@wdio/allure-reporter',
            {
                outputDir: path.resolve(__dirname, 'allure-results'),
                disableWebdriverStepsReporting: true,
                disableWebdriverScreenshotsReporting: false,
                useCucumberStepReporter: false,
                // Workaround: WDIO uses the package name (@wdio/allure-reporter) as
                // part of the log filename, which creates an illegal path on Linux
                // because "@wdio/" is treated as a subdirectory. Override with a
                // safe flat filename.
                setLogFile: (cid) =>
                    path.resolve(__dirname, 'allure-results', `wdio-${cid}-allure-reporter.log`),
            },
        ],
    ],

    // ─── Hooks ───────────────────────────────────────────────────────────────

    onPrepare() {
        // Ensure output directories exist before reporters try to write to them
        ['allure-results', 'errorShots'].forEach((dir) => {
            const fullPath = path.resolve(process.cwd(), dir);
            if (!fs.existsSync(fullPath)) {
                fs.mkdirSync(fullPath, { recursive: true });
            }
        });
        console.log('\n🚀  Starting WebdriverIO mobile test suite\n');
    },

    beforeTest(test) {
        const allureReporter = require('@wdio/allure-reporter').default;
        allureReporter.addEnvironment('Platform', process.env.PLATFORM || 'Android');
        allureReporter.addEnvironment('Test', test.fullTitle);
    },

    /**
     * Capture screenshot and attach to Allure on any test failure.
     */
    afterTest: async function afterTest(test, _context, { error, passed }) {
        if (!passed || error) {
            const safeName = test.fullTitle.replace(/[^a-z0-9]/gi, '_').substring(0, 80);
            try {
                await screenshotHelper.captureAndAttach(safeName);
            } catch (screenshotErr) {
                console.warn('⚠  Could not capture screenshot:', screenshotErr.message);
            }
        }
    },

    onComplete() {
        console.log('\n✅  Test run complete. Generate report: npm run allure:generate\n');
    },
};
