import { uglify } from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import { visualizer } from 'rollup-plugin-visualizer';

const isBundleVis = !!process.env.BUNDLE_VIS;

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.min.js',
      name: 'GraphLib',
      format: 'umd',
      sourcemap: false,
    },
    plugins: [
      nodePolyfills(),
      resolve(),
      commonjs(),
      typescript(),
      uglify(),
      ...(isBundleVis ? [visualizer({ open: true })] : []),
    ],
  },
];
