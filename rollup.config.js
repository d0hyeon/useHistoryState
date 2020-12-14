import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import babel from '@rollup/plugin-babel';
import { terser } from "rollup-plugin-terser";
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
    }, 
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
    }
  ],
  plugins: [
    external(),
    resolve({
      preferBuiltins: false
    }),
    commonjs({
      include: ['node_modules/**'],
    }),
    babel({ babelHelpers: 'bundled' }),
    typescript(),
    terser()
  ]
}