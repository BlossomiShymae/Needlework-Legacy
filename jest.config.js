/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./tests/unit/setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  globalTeardown: '<rootDir>/test-teardown-globals.js',
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
