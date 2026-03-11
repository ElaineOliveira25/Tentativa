'use strict';

/**
 * BrowserStack capabilities.
 *
 * Before use:
 *   1. Upload your app:  npx browserstack-upload <path-to-app>
 *   2. Set env vars (or replace placeholders):
 *        BROWSERSTACK_USERNAME
 *        BROWSERSTACK_ACCESS_KEY
 *        BROWSERSTACK_ANDROID_APP   (e.g. bs://abc123)
 *        BROWSERSTACK_IOS_APP       (e.g. bs://xyz456)
 *        BUILD_NAME                 (optional, e.g. CI build number)
 */

const common = {
    'bstack:options': {
        userName: process.env.BROWSERSTACK_USERNAME || 'YOUR_BROWSERSTACK_USERNAME',
        accessKey: process.env.BROWSERSTACK_ACCESS_KEY || 'YOUR_BROWSERSTACK_ACCESS_KEY',
        projectName: 'Desafio Banco Carrefour',
        buildName: process.env.BUILD_NAME || 'local-build',
        debug: true,
        networkLogs: true,
        appiumVersion: '2.0.0',
    },
};

module.exports = {
    android: {
        ...common,
        platformName: 'Android',
        'appium:deviceName': 'Samsung Galaxy S22',
        'appium:platformVersion': '12.0',
        'appium:app': process.env.BROWSERSTACK_ANDROID_APP || 'bs://YOUR_ANDROID_APP_ID',
        'appium:automationName': 'UiAutomator2',
        'bstack:options': {
            ...common['bstack:options'],
            sessionName: 'Android Tests',
            deviceName: 'Samsung Galaxy S22',
            osVersion: '12.0',
        },
    },

    ios: {
        ...common,
        platformName: 'iOS',
        'appium:deviceName': 'iPhone 14',
        'appium:platformVersion': '16',
        'appium:app': process.env.BROWSERSTACK_IOS_APP || 'bs://YOUR_IOS_APP_ID',
        'appium:automationName': 'XCUITest',
        'bstack:options': {
            ...common['bstack:options'],
            sessionName: 'iOS Tests',
            deviceName: 'iPhone 14',
            osVersion: '16',
        },
    },
};
