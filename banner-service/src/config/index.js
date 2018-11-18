const env = process.env.APP_ENV || 'development'
const config = require(`./${env}`)
config.env = env

module.exports = config
