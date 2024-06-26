/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["dotenv/config"],
  moduleNameMapper: {
    "^@/src/(.*)$": "<rootDir>/src/$1",
    "^@/tests/(.*)$": "<rootDir>/tests/$1",
  },
};
