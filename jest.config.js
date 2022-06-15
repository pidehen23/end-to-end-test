module.exports = {
  preset: "jest-puppeteer",
  moduleFileExtensions: ["js", "ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testMatch: ["**/?(*.)+(spec|test).[t]s"],
  testPathIgnorePatterns: ["/node_modules/", "dist"],
  // setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  roots: ["specs"],
};
