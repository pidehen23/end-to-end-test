jest.setTimeout(60000);

describe("Basic authentication e2e tests", () => {
  beforeAll(async () => {
    // Set a definite size for the page viewport so view is consistent across browsers
    await page.setViewport({
      width: 1366,
      height: 768,
      deviceScaleFactor: 1,
    });

    await page.goto("https://www.google.com");

    await page.waitForTimeout(5000);
  });

  it("Should be truthy", async () => {
    expect(true).toBeTruthy();
  });
});
