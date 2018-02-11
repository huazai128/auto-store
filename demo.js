const fs = require('fs')
const path = require('path')
const lessToJs = require('less-vars-to-js')

const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, 'assets/styles/__theme.less'), 'utf8'))

console.log(themeVariables)
