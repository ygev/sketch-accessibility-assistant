const path = require('path')
const pkg = require('./package.json')

module.exports = {
  target: 'web',
  mode: 'production',
  entry: './dist/index',
  output: {
    filename: 'sketch.js',
    path: path.resolve(process.cwd(), 'dist'),
    libraryTarget: 'var',
    library: ['_sketch', 'assistants', pkg.name],
  },
}
