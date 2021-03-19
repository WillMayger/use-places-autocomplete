import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/use-places-autocomplete.ts',
  output: {
    dir: 'dist',
    format: 'es'
  },
  external: ['react'],
  plugins: [
    typescript({
      declarationDir: 'dist',
      declaration: true,
      rootDir: 'src/',
      tsconfig: '.tsconfig.json'
    }),
  ],
}
