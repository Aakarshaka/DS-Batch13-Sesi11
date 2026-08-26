import { By } from "selenium-webdriver";

const BASE_URL = "https://saucedemo.com/";

export class loginPage {
    constructor(driver) {
        this.driver = driver;
        this.usernameField = By.css("[data-test='username']");
        this.passwordField = By.css("[data-test='password']");
        this.loginButton = By.css("[data-test='login-button']");
        this.errorMessage = By.css("[data-test='error']");
    }

    async open() {
        await this.driver.get(BASE_URL);
    }

    async login(username, password) {
        await this.driver.findElement(this.usernameField).sendKeys(username);
        await this.driver.findElement(this.passwordField).sendKeys(password);
        await this.driver.findElement(this.loginButton).click();
    }

    async getErrorMessage() {
        const errorMessage = await this.driver.findElement(this.errorMessage);
        return await errorMessage.getText();
    }
}