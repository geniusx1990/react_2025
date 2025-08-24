import { createDefaultEsmPreset, type JestConfigWithTsJest } from 'ts-jest';

const presetConfig = createDefaultEsmPreset({
  tsconfig: 'tsconfig.app.json',
});

const jestConfig: JestConfigWithTsJest = {
  ...presetConfig,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
  },

  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.spec.{ts,tsx}',
    '!src/index.{ts,tsx}',
    '!src/setupTests.{ts}',
    '!src/**/*.d.ts',
    '!src/components/pokemons/**',
    '!src/app/**',
    '!src/Context/**',
    '!src/Hooks/**',
    '!src/i18n/**',
    '!src/lib/pokemon.ts',
    '!src/query/**',





  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 50,
      functions: 50,
      lines: 50,
    },
  },
};

export default jestConfig;
