const config = require('./config')
const server = require('./server')
const logger = require('winston')
server.listen(process.env.PORT || config.port, () => {
  logger.log('info',`Started on port ${server.address().port}`)
})
