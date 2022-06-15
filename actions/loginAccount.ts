import { Page } from "puppeteer";
import chalk from "chalk";

export class LoginAccount {
  url: string;

  page: Page;

  loginBtn: string;

  loginBody: string;

  usernameField: string;

  passwordField: string;

  loginPageBtn: string;

  constructor(page: Page) {
    this.url = "http://127.0.0.1:8080/";
    this.page = page;
    this.loginBtn = "#login";
    this.loginBody = "#loginBody";
    this.usernameField = "#username";
    this.passwordField = "#password";
    this.loginPageBtn = "#loginBtn";
  }

  async login(username: string, password: string): Promise<string | null> {
    try {
      await this.page.goto(this.url, { timeout: 0 });
      await this.page.waitForSelector(this.loginBtn);
      await Promise.all([
        this.page.click(this.loginBtn),
        this.page.waitForNavigation(),
      ]);
      // Wait for the loginBody on the login page to load
      await this.page.waitForSelector(this.loginBody);

      // Type the login credentials into the input fields
      await this.page.type(this.usernameField, username);
      await this.page.waitForTimeout(1000);
      await this.page.type(this.passwordField, password);
      await this.page.waitForTimeout(1000);

      await Promise.all([
        this.page.click(this.loginPageBtn),
        this.page.waitForNavigation(),
      ]);

      // Wait for homepage to load
      await this.page.waitForSelector("#firstname");
      await this.page.waitForTimeout(2000);

      const firstname = await this.page.$eval(
        "#homeBody #firstname",
        (el) => el.textContent,
      );

      return firstname;
    } catch (err) {
      console.log(chalk.red("ERROR Login Account => ", err));
      return null;
    }
  }
}

export default (page: Page) => new LoginAccount(page);
