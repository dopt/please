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
});
