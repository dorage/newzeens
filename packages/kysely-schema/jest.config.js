/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["dotenv/config", "<rootDir>/tests/fast-check.ts"],
  moduleNameMapper: {
    "^@/src/(.*)$": "<rootDir>/src/$1",
    "^@/tests/(.*)$": "<rootDir>/tests/$1",
    "^@/migrator/(.*)$": "<rootDir>/migrator/$1",
  },
};
