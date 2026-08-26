import fs from "fs";
import { Builder, By, until } from "selenium-webdriver";
import { loginPage } from "../pages/LoginPage.js";

let driver = await new Builder().forBrowser("chrome").build();
let login = new loginPage(driver);

await login.open();
await driver.wait(until.elementLocated(login.usernameField), 20000);
const screenshot = await driver.takeScreenshot();

fs.writeFileSync(
    "./screenshots/baseline/login.png",
    screenshot,
    "base64"
);

await driver.quit();