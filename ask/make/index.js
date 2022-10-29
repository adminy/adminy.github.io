const fs = require('fs')
const path = require('path')
const textToChars = text => text.split('').map(c => c.charCodeAt(0))
const byteHex = n => ('0' + Number(n).toString(16)).slice(-2)
const applySaltToChar = (key, txt) => textToChars(key).reduce((a, b) => a ^ b, txt)

const encrypt = (key, text) => text.split('').map(textToChars).map(txt => applySaltToChar(key, txt)).map(byteHex).join('')

const hash = str => str.split('').map(v => v.charCodeAt(0)).reduce((a, v) => a + ((a << 7) + (a << 3)) ^ v).toString(16)

const key = process.argv[2]
const file = fs.readFileSync(path.resolve(process.argv[3])).toString()
fs.writeFileSync('quiz/' + hash(key), encrypt(key, file))
