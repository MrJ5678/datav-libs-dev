const path = require("path")
const resolve = require("rollup-plugin-node-resolve")
const commonjs = require("rollup-plugin-commonjs")
const babel = require("rollup-plugin-babel")
const json = require("rollup-plugin-json")
const { terser } = require("rollup-plugin-terser")
const vue = require("rollup-plugin-vue")
const postcss = require("rollup-plugin-postcss")

const inputPath = path.resolve(__dirname, "./src/index.js")
const outputUmdPath = path.resolve(__dirname, "./dist/index.min.js")
const outputEsPath = path.resolve(__dirname, "./dist/index.es.min.js")

module.exports = {
  input: inputPath,
  output: [
    {
      name: "datav",
      file: outputUmdPath,
      format: "umd",
      globals: {
        vue: "vue",
      },
    },
    {
      name: "datav",
      file: outputEsPath,
      format: "es",
      globals: {
        vue: "vue",
      },
    },
  ],
  plugins: [
    vue(),
    babel({
      exclude: "node_modules/**",
      runtimeHelpers: true,
      plugins: [
        [
          "@babel/plugin-transform-runtime",
          {
            regenerator: true,
          },
        ],
      ],
    }),
    resolve(),
    commonjs(),
    json(),
    terser(),
    postcss({
      plugins: [],
    }),
  ],
  external: ["vue"],
}
