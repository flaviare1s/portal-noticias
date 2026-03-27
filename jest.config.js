const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  collectCoverageFrom: [
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "infrastructure/**/*.{ts,tsx}",
    "schemas/**/*.{ts,tsx}",
    "types/**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!app/layout.tsx",
    "!app/loading.tsx",
    "!app/error.tsx",
    "!app/not-found.tsx",
    "!app/robots.ts",
    "!app/sitemap.ts",
  ],
  coverageProvider: "v8",
  coverageDirectory: "<rootDir>/coverage",
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
};

module.exports = createJestConfig(customJestConfig);
