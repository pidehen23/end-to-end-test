module.exports = {
  preset: "jest-puppeteer",
  moduleFileExtensions: ["js", "ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  // testMatch: [
  //   "<rootDir>/test/**/*.+(ts|js)",
  //   "<rootDir>/specs/**/*.+(ts|js)",
  //   "<rootDir>/actions/**/*.+(ts|js)",
  //   "<rootDir>/utils/**/*.+(ts|js)",
  //   "<rootDir>/logs/**/*.+(ts|js)",
  // ],
  testMatch: ["**/?(*.)+(spec|test).[t]s"],
  testPathIgnorePatterns: ["/node_modules/", "dist"],
  // setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  roots: ["specs"],
};
