module.exports = {
  launch: {
    headless: false,
    // args: ["--window-size=1366,768"],
    args: ["--disable-setuid-sandbox", "--start-fullscreen"],
    product: "chrome",
    // dumpio: true, // Whether to pipe the browser process stdout and stderr
  },
};
