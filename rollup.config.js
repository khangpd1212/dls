const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('rollup-plugin-typescript2');
const postcss = require('rollup-plugin-postcss');
const copy = require('rollup-plugin-copy');
const json = require('@rollup/plugin-json');
const optimizeJs = require('rollup-plugin-optimize-js');
const terser = require('@rollup/plugin-terser');

const packageJson = require('./package.json');

module.exports = [
  {
    input: 'src/lib.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        inlineDynamicImports: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
        inlineDynamicImports: true,
      },
    ],

    plugins: [
      copy({
        targets: [
          { src: './public/css', dest: 'lib' },
          { src: './public/fonts', dest: 'lib' },
          { src: './public/duo-icon', dest: 'lib' },
        ],
      }),
      peerDepsExternal(),
      resolve({
        jsnext: true,
        preferBuiltins: true,
        browser: true,
      }),
      commonjs(),
      typescript({ useTsconfigDeclarationDir: true }),
      postcss(),
      json({ compact: true }),
      terser(),
      optimizeJs(),
    ],
    external: ['lodash', 'axios'],
    targets: [
      {
        sourceMap: true,
        format: 'iife',
      },
    ],
  },
];
