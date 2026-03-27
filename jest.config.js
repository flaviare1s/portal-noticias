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

  collectCoverage: true,
  collectCoverageFrom: [
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "infrastructure/**/*.{ts,tsx}",
    "schemas/**/*.{ts,tsx}",
    "types/**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!**/*.test.{ts,tsx}",
    "!**/*.spec.{ts,tsx}",
    "!app/layout.tsx",
    "!app/loading.tsx",
    "!app/error.tsx",
    "!app/not-found.tsx",
    "!app/robots.ts",
    "!app/sitemap.ts",
  ],

  coverageProvider: "v8",
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["text", "lcov", "html"],

  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],

  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

module.exports = createJestConfig(customJestConfig);
