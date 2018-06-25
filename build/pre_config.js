const fs = require('fs')
const path = require('path')

const DEV_BASE_URL = 'http://note-server.hunger-valley.com'
const PROD_BASE_URL = 'http://note-server.hunger-valley.com'

exports.config = function ({isDev = true} = {isDev: true}) {
    let fileText = `
        module.exports = {
            baseUrl: '${isDev ? DEV_BASE_URL : PROD_BASE_URL}'
        }
    `
    fs.writeFileSync(path.join(__dirname, '../src/servers/baseUrl.js'), fileText)
}
