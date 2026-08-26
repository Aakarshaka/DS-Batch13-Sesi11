import {Builder, By, until} from "selenium-webdriver";
import { loginPage } from "../pages/LoginPage.js";
import { expect } from "chai";
import { captureScreenshot, compareScreenshots } from "../utils/VisualRegressionHelper.js";

describe("Login Page", function () {
    let driver;
    let login;

    beforeEach(async function () {
        driver = await new Builder().forBrowser("chrome").build();
        login = new loginPage(driver);
        await login.open();
    });

    afterEach(async function () {
        await driver.quit();
    });

    it("visual regression test for login page", async function () {
        this.timeout(20000);
        await driver.sleep(2000);
        await captureScreenshot(driver, "./screenshots/actual/login.png");
        const diffPixels = compareScreenshots(
            "./screenshots/baseline/login.png",
            "./screenshots/actual/login.png",
            "./screenshots/diff/login_diff.png");
        expect(diffPixels).to.equal(0);
    });

    it("should validate login with valid credentials", async function () {
        await login.login("standard_user", "secret_sauce");
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.equal("https://www.saucedemo.com/inventory.html");
    });

    it("get error message for invalid credentials", async function () {
        await login.login("invalid_user", "invalid_password");
        const errorMessage = await login.getErrorMessage();
        expect(errorMessage).to.equal("Epic sadface: Username and password do not match any user in this service");
    });
});