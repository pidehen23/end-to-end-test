import credentials, { IUserInfo } from "../utils/credentials";
import createAccount, { CreateAccount } from "../actions/createAccount";
import loginAccount, { LoginAccount } from "../actions/loginAccount";

jest.setTimeout(60000);

describe("Basic authentication e2e tests", () => {
  let credential!: IUserInfo;
  let createInfo!: CreateAccount;
  let loginInfo!: LoginAccount;

  beforeAll(async () => {
    // Set a definite size for the page viewport so view is consistent across browsers
    await page.setViewport({
      width: 1366,
      height: 768,
      deviceScaleFactor: 1,
    });

    credential = credentials("User");
    createInfo = createAccount(page);
    loginInfo = loginAccount(page);
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
    const firstname = await loginInfo.login(
      credential.username,
      credential.password,
    );
    page.waitForTimeout(1000);
    expect(credential.fullname).toContain(firstname);
  });

  it("Should not login on wrong credentials", async () => {
    try {
      page.on("dialog", (dialog) => {
        expect(dialog.message()).toBe("Invalid username or password inputted");
        dialog.accept();
      });

      await page.goto("http://127.0.0.1:8080/login.html");
      await page.type("#username", "username");
      await page.type("#password", "password");
      await page.click("#loginBtn");
      await page.waitForTimeout(5000); // Wait for the dialog to accept the prompt before proceeding
    } catch (err) {
      console.log("An error occured while trying to login => ", err);
    }
  });
});
