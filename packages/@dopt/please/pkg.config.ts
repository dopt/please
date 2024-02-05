import { defineConfig } from '@pkg-tools/config';

export default defineConfig({
  build: {
    entries: ['src/index'],
    rollup: {
      esbuild: {
        target: 'node16',
        minify: true,
      },
    },
    declaration: 'node16',
  },
  format: {
    singleQuote: true,
  },
  lint: {
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
});
