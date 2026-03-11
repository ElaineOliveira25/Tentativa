'use strict';

// Ensure Android SDK is always discoverable by Appium
process.env.ANDROID_HOME = process.env.ANDROID_HOME || '/home/elaineldo/Android/Sdk';
process.env.ANDROID_SDK_ROOT = process.env.ANDROID_SDK_ROOT || '/home/elaineldo/Android/Sdk';

const { config: baseConfig } = require('./wdio.conf');
const androidCaps = require('./config/caps.android');

exports.config = {
    ...baseConfig,

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
                    log: './appium-android.log',
                },
            },
        ],
    ],

    capabilities: [androidCaps],

    beforeSession() {
        process.env.PLATFORM = 'Android';
    },
};