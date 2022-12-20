export default {
  testTimeout: 30000,
  preset: 'ts-jest',
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
}
