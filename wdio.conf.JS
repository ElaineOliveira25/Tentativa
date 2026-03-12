'use strict';

const fs   = require('fs');
const path = require('path');
const screenshotHelper = require('./helpers/screenshotHelper');

exports.config = {
    runner: 'local',

    specs: ['./tests/specs/**/*.spec.js'],
    exclude: [],

    maxInstances: 1,

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

    // ─── Reporters ────────────────────────────────────────────────────────────

    reporters: [
        'spec',
        [
            '@wdio/allure-reporter',
            {
                outputDir: path.resolve(__dirname, 'allure-results'),
                disableWebdriverStepsReporting: true,
                disableWebdriverScreenshotsReporting: false,
                useCucumberStepReporter: false,
                setLogFile: (cid) =>
                    path.resolve(__dirname, 'allure-results', `wdio-${cid}-allure-reporter.log`),
            },
        ],
    ],

    // ─── Hooks ────────────────────────────────────────────────────────────────

    /**
     * onPrepare — executado uma vez antes de qualquer sessão iniciar.
     * Cria as pastas de artefatos e grava o categories.json para o Allure,
     * que classifica falhas automaticamente no relatório.
     */
    onPrepare() {
        // Limpar resultados anteriores para garantir relatório da execução atual
        const resultsDir = path.resolve(process.cwd(), 'allure-results');
        if (fs.existsSync(resultsDir)) {
            fs.rmSync(resultsDir, { recursive: true, force: true });
        }

        // Garantir que a pasta de screenshots de falha exista
        const errorShotsPath = path.resolve(process.cwd(), 'errorShots');
        if (!fs.existsSync(errorShotsPath)) {
            fs.mkdirSync(errorShotsPath, { recursive: true });
        }

        console.log('\n🚀  Starting WebdriverIO mobile test suite\n');
    },

    /**
     * before — executado uma vez por sessão, após o driver ser iniciado.
     * Grava o environment.properties com dados do dispositivo e ambiente,
     * que aparecem na aba "Environment" do relatório Allure.
     */
    before(capabilities) {
        const platform   = capabilities.platformName        || process.env.PLATFORM || 'Unknown';
        const device     = capabilities['appium:deviceName']|| 'Unknown';
        const udid       = capabilities['appium:udid']      || 'Unknown';
        const automation = capabilities['appium:automationName'] || 'Unknown';
        const appPath    = capabilities['appium:app']       || '';
        const appName    = path.basename(appPath) || 'Unknown';

        const envContent = [
            `Platform=${platform}`,
            `Device=${device}`,
            `UDID=${udid}`,
            `Automation=${automation}`,
            `App=${appName}`,
            `Node.js=${process.version}`,
            `WebdriverIO=8.x`,
        ].join('\n');

        const envFile = path.resolve(process.cwd(), 'allure-results', 'environment.properties');
        fs.writeFileSync(envFile, envContent);
    },

    /**
     * afterTest — executado após cada caso de teste.
     * Em caso de falha: captura screenshot, salva em errorShots/ e anexa ao Allure.
     */
    afterTest: async function (test, _context, { passed, error }) {
        if (!passed) {
            const testTitle = test?.title || 'unknown_test';
            try {
                await screenshotHelper.captureAndAttach(testTitle);
            } catch (e) {
                console.log('Não foi possível salvar screenshot: sessão encerrada.');
            }

            // Anexar mensagem de erro ao Allure como texto
            if (error?.message) {
                try {
                    const allureReporter = require('@wdio/allure-reporter').default;
                    allureReporter.addAttachment(
                        'Mensagem de Erro',
                        Buffer.from(error.message, 'utf8'),
                        'text/plain',
                    );
                } catch {
                    // Allure pode não estar disponível em todos os ambientes
                }
            }
        }
    },

    /**
     * onComplete — executado após toda a suíte terminar.
     * Grava categories.json e copia o log do Appium em allure-results/,
     * que já foi criada pelo reporter durante a execução dos testes.
     */
    onComplete() {
        const resultsDir = path.resolve(process.cwd(), 'allure-results');

        if (fs.existsSync(resultsDir)) {
            // categories.json — classifica tipos de falha no relatório Allure
            const categories = [
                {
                    name: 'Falhas de produto',
                    messageRegex: '.*AssertionError.*',
                    matchedStatuses: ['failed'],
                },
                {
                    name: 'Falhas de infraestrutura',
                    messageRegex: '.*(WebDriverError|TimeoutError|NoSuchElementError|StaleElementReferenceError).*',
                    matchedStatuses: ['failed', 'broken'],
                },
                {
                    name: 'Testes ignorados',
                    matchedStatuses: ['skipped'],
                },
                {
                    name: 'Testes quebrados',
                    matchedStatuses: ['broken'],
                },
            ];

            fs.writeFileSync(
                path.join(resultsDir, 'categories.json'),
                JSON.stringify(categories, null, 2),
            );

            // Copia o log do Appium para ficar disponível no relatório
            const appiumLog = path.resolve(process.cwd(), 'appium.log');
            if (fs.existsSync(appiumLog)) {
                try {
                    fs.copyFileSync(appiumLog, path.join(resultsDir, 'appium.log'));
                    console.log('📋  Appium log copiado para allure-results/');
                } catch {
                    // Não bloquear o fluxo se a cópia falhar
                }
            }
        }

        console.log('\n✅  Test run complete. Generate report: npm run allure:report\n');
    },
};
