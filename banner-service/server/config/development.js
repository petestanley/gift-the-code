const port = process.env.NODE_PORT || 4000

module.exports = {
  port,
  datastore: {
    host: 'redis'
  },
  bodyParser: {
    limit: '100kb'
  },
}
