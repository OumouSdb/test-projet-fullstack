module.exports = {
  moduleNameMapper: {
    '@core/(.*)': '<rootDir>/src/app/core/$1',
  },
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  bail: false,
  verbose: false,
  collectCoverage: true,
  coverageDirectory: './coverage/jest',
  testMatch: [
    "<rootDir>/src/**/*.spec.ts"
  ],
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  coveragePathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/src/app/interfaces/",
    "<rootDir>/src/app/guards/",
    "<rootDir>/src/app/interceptors/",
    "<rootDir>/src/app/auth-routing.module.ts",
  ],

  coverageThreshold: {
    global: {
      statements: 80
    },
  },
  roots: [
    "<rootDir>/src"
  ],
  modulePaths: [
    "<rootDir>"
  ],
  moduleDirectories: [
    "node_modules"
  ]
};
