'use strict';

const path = require('path');

/**
 * iOS desired capabilities.
 * Override any value via environment variables for CI flexibility.
 */
module.exports = {
    platformName: 'iOS',
    'appium:deviceName': process.env.IOS_DEVICE || 'iPhone 14',
    'appium:platformVersion': process.env.IOS_VERSION || '16.4',
    'appium:automationName': 'XCUITest',
    'appium:app': process.env.IOS_APP_PATH
        || path.resolve(__dirname, '../app/ios.app'),
    'appium:noReset': false,
    'appium:fullReset': false,
    'appium:newCommandTimeout': 240,
    'appium:autoAcceptAlerts': true,
    'appium:shouldUseSingletonTestManager': false,
    'wdio:maxInstances': 1,
};
