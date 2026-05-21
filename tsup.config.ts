import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/root.ts'],
    format: ['esm'],
    clean: true,
    treeshake: true,
    minify: true,
    splitting: false,
    dts: false,
    target: 'ES2022',
});