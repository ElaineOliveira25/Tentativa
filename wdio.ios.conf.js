'use strict';

const { config: baseConfig } = require('./wdio.conf');
const iosCaps = require('./config/caps.ios');

exports.config = {
    ...baseConfig,

    // Appium server settings
    hostname: '127.0.0.1',
    port: 4723,
    path: '/',

    services: [
        [
            'appium',
            {
                command: 'appium',
                args: {
                    address: '127.0.0.1',
                    port: 4723,
                    relaxedSecurity: true,
                    log: './appium-ios.log',
                },
            },
        ],
    ],

    capabilities: [iosCaps],

    beforeSession() {
        process.env.PLATFORM = 'iOS';
    },
};
