/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["dotenv/config", "<rootDir>/tests/setups/fast-check.ts"],
  roots: ["<rootDir>/src/migrations/v0.0.0-2024-04-29T07:31:56.202Z/"],
  moduleNameMapper: {
    "^@/src/(.*)$": "<rootDir>/src/$1",
    "^@/tests/(.*)$": "<rootDir>/tests/$1",
    "^@/migrator/(.*)$": "<rootDir>/migrator/$1",
  },
};
