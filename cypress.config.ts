import { defineConfig } from 'cypress';

export default defineConfig({
  videosFolder: 'cypress/videos',
  screenshotsFolder: 'cypress/screenshots',
  fixturesFolder: 'cypress/fixtures',
  video: false,
  e2e: {
    setupNodeEvents(on, config) {
      // Importer les plugins
      return require('./cypress/plugins/index.ts').default(on, config);
    },
    baseUrl: 'http://localhost:4200',
  },
  env: {
    codeCoverage: {
      exclude: [
        "**/src/app/services/**",
        "**/src/app/interfaces/**",
        "**/src/app/interceptors/**",
        "**/src/app/features/auth/components/interfaces**",
        "**/src/app/features/auth/services**",
        "**/src/app/features/sessions/services**",
        "**/src/app/guards/**",
        "**/src/app/interfaces/**",
      ],
    },
  },
});
