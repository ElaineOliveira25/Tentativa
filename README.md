<<<<<<< HEAD
# Teste
=======
# Desafio Banco Carrefour — Mobile Test Automation

End-to-end mobile test automation suite for the [WebdriverIO native-demo-app](https://github.com/webdriverio/native-demo-app), built with **WebdriverIO v8**, **Appium 2**, **Mocha**, **Chai**, and **Allure Report**.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Test Scenarios](#test-scenarios)
- [Allure Report](#allure-report)
- [BrowserStack](#browserstack-optional)
- [CI/CD — GitLab](#cicd--gitlab)
- [Assumptions & Known Limitations](#assumptions--known-limitations)

---

## Project Structure

```
desafio-banco-carrefour/
├── .gitignore
├── .gitlab-ci.yml
├── README.md
├── package.json
├── wdio.conf.js                  # Base config (hooks, reporters, Mocha)
├── wdio.android.conf.js          # Android runner
├── wdio.ios.conf.js              # iOS runner
├── wdio.browserstack.conf.js     # BrowserStack runner
│
├── app/                          # Drop your .apk / .ipa / .app here
├── config/
│   ├── caps.android.js
│   ├── caps.ios.js
│   └── caps.browserstack.js
│
├── data/                         # JSON test data (data-driven)
│   ├── users.json
│   └── forms.json
│
├── helpers/
│   ├── gestures.js               # W3C touch-action helpers
│   └── screenshotHelper.js       # Screenshot + Allure attachment
│
├── pages/                        # Page Object Model
│   ├── BasePage.js
│   ├── LoginPage.js
│   ├── SignUpPage.js
│   ├── HomePage.js
│   ├── FormPage.js
│   └── SwipePage.js
│
├── tests/specs/
│   ├── 01_login.spec.js          # TC-01, TC-02, TC-03
│   ├── 02_signup.spec.js         # TC-04, TC-05
│   ├── 03_navigation.spec.js     # TC-06
│   ├── 04_form.spec.js           # TC-07, TC-08, TC-09
│   └── 05_e2e.spec.js            # TC-10
│
└── utils/
    └── assertions.js             # Chai wrappers
```

---

## Prerequisites

| Tool | Version | Notes |
|------|---------|-------|
| Node.js | ≥ 18 | `node --version` |
| npm | ≥ 9 | bundled with Node 18 |
| Java (JDK) | ≥ 11 | Required by Appium / Android SDK |
| Android SDK / `adb` | latest | Set `ANDROID_HOME` env var |
| Appium 2 | ≥ 2.5 | `npm install -g appium` |
| appium-uiautomator2-driver | latest | `appium driver install uiautomator2` |
| appium-xcuitest-driver | latest | `appium driver install xcuitest` (macOS only) |
| Allure CLI | ≥ 2.27 | `npm install -g allure-commandline` |
| Android Emulator **or** physical device | API 28+ | for Android runs |
| Xcode + Simulator | ≥ 14 | macOS only, for iOS runs |

---

## Installation

```bash
# 1. Clone / unzip the project
cd desafio-banco-carrefour

# 2. Install Node dependencies
npm ci

# 3. Verify Appium drivers
appium driver list --installed
```

### Place the app binary

Copy the app file to the `app/` folder:

```bash
# Android
cp /path/to/android.apk app/android.apk

# iOS (simulator build)
cp /path/to/ios.app app/ios.app
```

> The default path configured in `config/caps.android.js` is `app/android.apk`.
> Override with the `ANDROID_APP_PATH` or `IOS_APP_PATH` environment variable.

---

## Configuration

### Environment variables (override defaults)

| Variable | Default | Description |
|----------|---------|-------------|
| `ANDROID_DEVICE` | `emulator-5554` | ADB device serial |
| `ANDROID_VERSION` | `13.0` | Platform version |
| `ANDROID_APP_PATH` | `app/android.apk` | Path to APK |
| `IOS_DEVICE` | `iPhone 14` | Simulator name |
| `IOS_VERSION` | `16.4` | iOS version |
| `IOS_APP_PATH` | `app/ios.app` | Path to .app bundle |

### Credentials (`data/users.json`)

Update `validUser.username` and `validUser.password` to match an existing account in your app build before running.

---

## Running Tests

### Android — full suite

```bash
npm run test:android
```

### Android — single spec file

```bash
npm run test:android:login
npm run test:android:signup
npm run test:android:navigation
npm run test:android:form
npm run test:android:e2e
```

### iOS — full suite

```bash
npm run test:ios
```

### iOS — single spec

```bash
npm run test:ios:login
npm run test:ios:e2e
```

### Clean output folders

```bash
npm run clean
```

---

## Test Scenarios

| ID | Title | Spec file |
|----|-------|-----------|
| TC-01 | Valid login with correct credentials | `01_login.spec.js` |
| TC-02 | Invalid login — wrong password shows error | `01_login.spec.js` |
| TC-03 | Login required-field validation (empty form) | `01_login.spec.js` |
| TC-04 | Valid sign up with all required fields | `02_signup.spec.js` |
| TC-05 | Sign up required-field validation (empty form) | `02_signup.spec.js` |
| TC-06 | Navigate between all screens via bottom nav | `03_navigation.spec.js` |
| TC-07 | Valid form submission shows success message | `04_form.spec.js` |
| TC-08 | Invalid form data triggers validation errors | `04_form.spec.js` |
| TC-09 | Mobile gesture interaction on Swipe screen | `04_form.spec.js` |
| TC-10 | End-to-end happy path (sign up → login → form) | `05_e2e.spec.js` |

---

## Allure Report

Screenshots are automatically captured on test failure and attached to the report.

```bash
# After a test run, generate the HTML report
npm run allure:generate

# Open the report in the default browser
npm run allure:open

# Or serve it live (watches allure-results/)
npm run allure:serve
```

---

## BrowserStack (optional)

1. Upload your app to BrowserStack App Automate and note the `bs://` URL.
2. Export credentials:

```bash
export BROWSERSTACK_USERNAME="your_username"
export BROWSERSTACK_ACCESS_KEY="your_access_key"
export BROWSERSTACK_ANDROID_APP="bs://YOUR_APP_ID"
export BROWSERSTACK_IOS_APP="bs://YOUR_IOS_APP_ID"
```

3. Run:

```bash
npm run test:browserstack
```

Device/OS targets are configured in `config/caps.browserstack.js`.

---

## CI/CD — GitLab

The `.gitlab-ci.yml` defines three stages:

| Stage | Job | Trigger |
|-------|-----|---------|
| install | `install` | always |
| test | `test:android` | MR, `main`, `develop` |
| test | `test:browserstack:android` | **manual**, `main` / tags |
| report | `allure:report` | after `test:android` |

### Required CI/CD variables (Settings → CI/CD → Variables)

- `ANDROID_APP_PATH` — path to the APK inside the runner
- `BROWSERSTACK_USERNAME`, `BROWSERSTACK_ACCESS_KEY`, `BROWSERSTACK_ANDROID_APP` — for the manual BrowserStack job

---

## Assumptions & Known Limitations

1. **Selector IDs** — selectors in `pages/*.js` use the accessibility IDs from the WebdriverIO native-demo-app (`~test-username`, `~test-login-btn`, etc.). If your build exposes different IDs, update the getter methods in the corresponding page files.

2. **Valid credentials** — `data/users.json → validUser` must correspond to an account that already exists in the app (demo/seeded). Update it before running TC-01 and TC-06–10.

3. **Unique email in TC-04 / TC-10** — sign-up tests append `Date.now()` to generate a unique email per run. If the app backend is shared, old registrations may accumulate.

4. **iOS requires macOS** — Appium XCUITest driver only runs on a Mac. Android tests run on any OS with the Android SDK.

5. **Appium auto-start** — the `@wdio/appium-service` starts Appium automatically; you do **not** need to run `appium` manually before the tests.

6. **BrowserStack parallel sessions** — `wdio.browserstack.conf.js` sets `maxInstances: 2` to run Android and iOS simultaneously. Adjust to `1` if your plan only allows one concurrent session.
>>>>>>> 4a9c56f (a)
