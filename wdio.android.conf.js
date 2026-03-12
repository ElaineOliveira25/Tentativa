'use strict';

const path = require('path');
const { config: baseConfig } = require('./wdio.conf.JS');

/**
 * Android runner — herda toda a configuração base (hooks, reporters, screenshotHelper)
 * e adiciona as capabilities e serviço Appium específicos para Android.
 *
 * Executar: npm run test:android
 */
exports.config = {
    ...baseConfig,

    // ─── Timeouts Android ─────────────────────────────────────────────────────
    logLevel: 'error',

    logLevels: {
        webdriver: 'error',
        '@wdio/appium-service': 'error',
    },

    waitforTimeout: 20000,
    connectionRetryTimeout: 180000,
    connectionRetryCount: 1,

    mochaOpts: {
        ui: 'bdd',
        timeout: 120000,
    },

    // ─── Appium service ───────────────────────────────────────────────────────
    services: [
        ['appium', {
            command: 'appium',
            args: {
                relaxedSecurity: true,
                log: path.resolve(__dirname, 'appium.log'),
            },
        }],
    ],

    // ─── Android capabilities ─────────────────────────────────────────────────
    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'Android Emulator',
        'appium:udid': 'emulator-5554',
        'appium:app': path.resolve(__dirname, 'apps/android/android.wdio.native.app.v2.0.0.apk'),
        'appium:autoGrantPermissions': true,
        'appium:noReset': false,
        'appium:fullReset': false,
        'appium:newCommandTimeout': 240,
        'appium:adbExecTimeout': 120000,
        'appium:androidInstallTimeout': 120000,
        'appium:uiautomator2ServerInstallTimeout': 120000,
        'appium:uiautomator2ServerLaunchTimeout': 120000,
        'appium:appWaitDuration': 30000,
        'appium:disableWindowAnimation': true,
    }],
};
