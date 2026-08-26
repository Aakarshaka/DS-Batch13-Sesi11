import {Builder, By, until} from "selenium-webdriver";
import { loginPage } from "../pages/loginPage.js";
import { expect } from "chai";

describe("Login Page", function () {
    let driver;
    let login;

    beforeeach(async function () {
        driver = await new Builder().forBrowser("chrome").build();
        login = new loginPage(driver);
        await login.open();
    });

    aftereach(async function () {
        await driver.quit();
    });

    it("should validate login with valid credentials", async function () {
        await login.login("standard_user", "secret_sauce");
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.equal("https://saucedemo.com/inventory.html");
    });
});