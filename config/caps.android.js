'use strict';

const path = require('path');

module.exports = {
    platformName: 'Android',
    'appium:deviceName': process.env.ANDROID_DEVICE || 'emulator-5554',
    'appium:platformVersion': process.env.ANDROID_VERSION || '16',
    'appium:automationName': 'UiAutomator2',
    'appium:app': process.env.ANDROID_APP_PATH ||
        path.resolve(__dirname, '../apps/android/android.wdio.native.app.v2.0.0.apk'),
    'appium:appWaitActivity': '*',
    'appium:noReset': false,
    'appium:fullReset': false,
    'appium:newCommandTimeout': 240,
    'appium:autoGrantPermissions': true,
    'appium:ignoreHiddenApiPolicyError': true,
    'wdio:maxInstances': 1,
};