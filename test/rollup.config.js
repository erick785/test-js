// eslint-disable-next-line unicorn/filename-case
import babel from 'rollup-plugin-babel'
import json from 'rollup-plugin-json'
import autoExternal from 'rollup-plugin-auto-external'
import cleanup from 'rollup-plugin-cleanup'

const config = [
  {
    input: './index.js',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs'
      },
      {
        name: 'test',
        file: 'dist/index.js',
        format: 'umd',
        globals: {}
      }
    ],
    plugins: [
      babel({
        exclude: 'node_modules/**',
        babelrc: false,
        runtimeHelpers: true,
        presets: [
          [
            '@babel/env',
            {
              modules: false,
              targets: {
                node: '8',
                browsers: 'last 2 versions'
              }
            }
          ]
        ],
        plugins: [
          '@babel/plugin-proposal-export-default-from',
          '@babel/plugin-proposal-export-namespace-from',
          [
            '@babel/plugin-transform-runtime',
            {
              helpers: true,
              regenerator: true
            }
          ]
        ]
      }),
      json(),
      autoExternal(),
      cleanup()
    ]
  }
]

export default config
