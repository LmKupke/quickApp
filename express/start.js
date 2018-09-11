// Transpile all code following this line with babel and use 'env' (aka ES6) preset.
require('babel-register')({
  presets: [ 'env' ],
  "plugins": [
    "transform-runtime",
    "transform-async-to-generator",
    "transform-object-rest-spread"
  ]
})

// Import the rest of our application.
module.exports = require('./server.js')
