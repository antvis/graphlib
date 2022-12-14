export default {
  // runner: 'jest-electron/runner',
  // testEnvironment: 'jest-electron/environment',
  testTimeout: 30000,
  preset: 'ts-jest/presets/js-with-ts',
  globals: {
    'ts-jest': {
      tsconfig: {
        target: 'esnext', // Increase test coverage.
        allowJs: true,
        sourceMap: true,
      },
    },
  },
  collectCoverage: false,
  testRegex: '(/__tests__/.*\\.(test|spec))\\.ts$',
  collectCoverageFrom: ['src/**/*.ts'],
  // Transform esm to cjs.
  // transformIgnorePatterns: [`<rootDir>/node_modules/(?!(${esm}))`],
  // testPathIgnorePatterns: [
  //   '<rootDir>/__tests__/unit/(statistic|infer|composition|interaction|runtime|interaction|mark|shape)',
  // ],
}
