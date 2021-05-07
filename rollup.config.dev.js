const path = require("path")
// const resolve = require("rollup-plugin-node-resolve")

const inputPath = path.resolve(__dirname, "./src/index.js")
const outputUmdPath = path.resolve(__dirname, "./dist/datav.js")
const outputEsPath = path.resolve(__dirname, "./dist/datav.es.js")

module.exports = {
  input: inputPath,
  output: [
    {
      name: "datav",
      file: outputUmdPath,
      format: "umd",
    },
    {
      name: "datav",
      file: outputEsPath,
      format: "es",
    },
  ],
  // plugins: [resolve()],
}
