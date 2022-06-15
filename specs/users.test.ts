import credentials, { IUserInfo } from "../utils/credentials";
import createAccount, { CreateAccount } from "../actions/createAccount";
import loginAccount from "../actions/loginAccount";

jest.setTimeout(120 * 1000);

describe("Basic authentication e2e tests", () => {
  let credential!: IUserInfo;
  let createInfo!: CreateAccount;

  beforeAll(async () => {
    page.setDefaultTimeout(120 * 1000);
    await page.setViewport({
      width: 0,
      height: 0,
      deviceScaleFactor: 1,
    });

    credential = credentials("User");
    createInfo = createAccount(page);
  });

  // disabled by default but remove the 'x' and can configure debug mode globally
  xit("should put test in debug mode", async () => {
    await jestPuppeteer.debug();
  });

  it("should be titled \"Sample Auth Page\"", async () => {
    await page.goto("http://127.0.0.1:8080/");
    await expect(page.title()).resolves.toMatch("Sample Auth Page");
  });

  it("Should be able to create an account", async () => {
    const firstname = await createInfo.signup(
      credential.fullname,
      credential.username,
      credential.password,
    );
    await page.waitForTimeout(1000);
    expect(credential.fullname).toContain(firstname);
  });

  it("Should be able to log in after a successful account creation", async () => {
    const page = await browser.newPage();
    const loginInfo = loginAccount(page);
    const firstname = await loginInfo.login(
      credential.username,
      credential.password,
    );
    await page.waitForTimeout(1000);
    expect(credential.fullname).toContain(firstname);
    await page.close();
  });

  it("Should not login on wrong credentials", async () => {
    try {
      const page = await browser.newPage();
      page.on("dialog", (dialog) => {
        expect(dialog.message()).toBe("Invalid username or password inputted");
        dialog.accept();
      });

      await page.goto("http://127.0.0.1:8080/login.html");
      await page.type("#username", "username");
      await page.type("#password", "password");
      await page.click("#loginBtn");
      // Wait for the dialog to accept the prompt before proceeding
      await page.waitForTimeout(5000);
    } catch (err) {
      console.log("An error occured while trying to login => ", err);
    }
  });
});
