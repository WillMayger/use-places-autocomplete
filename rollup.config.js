import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'src/use-places-autocomplete.ts',
  output: {
    dir: 'dist',
    format: 'cjs'
  },
  external: [ 'react' ],
  plugins: [
    typescript({
      module: 'CommonJS',
      lib: ['es2020', 'dom']
    }),
    commonjs({extensions: ['.js', '.ts']}),
  ]
}
