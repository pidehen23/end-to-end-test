module.exports = {
  launch: {
    headless: false,
    // args: ["--window-size=1366,768"],
    args: [
      "--start-fullscreen",
      "--start-maximized",
      "--disable-dev-shm-usage",
    ],
    product: "chrome",
    defaultViewport: null,
    dumpio: true, // Whether to pipe the browser process stdout and stderr
    // slowMo: 100, // 放慢速度
    // ignoreHTTPSErrors: true,
  },
  browserContext: "default",
  server: {
    command: "npm run server",
    // port: 4444,
  },
};
