'use strict';

const { config: baseConfig } = require('./wdio.conf.JS');
const bsCaps = require('./config/caps.browserstack');

/**
 * BrowserStack runner.
 *
 * Set the required env vars before running:
 *   BROWSERSTACK_USERNAME, BROWSERSTACK_ACCESS_KEY,
 *   BROWSERSTACK_ANDROID_APP (or BROWSERSTACK_IOS_APP),
 *   BUILD_NAME (optional)
 *
 * Run: npm run test:browserstack
 */
exports.config = {
    ...baseConfig,

    user: process.env.BROWSERSTACK_USERNAME || 'YOUR_BROWSERSTACK_USERNAME',
    key: process.env.BROWSERSTACK_ACCESS_KEY || 'YOUR_BROWSERSTACK_ACCESS_KEY',

    hostname: 'hub-cloud.browserstack.com',
    port: 443,
    path: '/wd/hub',
    protocol: 'https',

    services: [
        [
            'browserstack',
            {
                browserstackLocal: false,
                opts: {
                    force: 'true',
                },
            },
        ],
    ],

    // Run Android and iOS in parallel on BrowserStack
    capabilities: [bsCaps.android, bsCaps.ios],

    maxInstances: 2,

    beforeSession() {
        process.env.PLATFORM = 'BrowserStack';
    },
};
