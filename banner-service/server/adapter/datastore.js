const { promisify } = require('util')
const config = require('../config')
const Redis = require('ioredis')

class DataStore {
  constructor() {
    this.client = new Redis({
      ...config.datastore
    })
    this.set = promisify(this.client.set).bind(this.client)
    this.get = promisify(this.client.get).bind(this.client)
    this.exists = promisify(this.client.exists).bind(this.client)
    this.sadd = promisify(this.client.sadd).bind(this.client)
    this.keys = promisify(this.client.keys).bind(this.client)
  }

  async store(key, value) {
    const response = await this.set(key, value)
    if (response === 'OK') {
      return true
    }
    throw new Error('Internal Server Error: Can not store value in cache.')
  }

  async retrieve(keys) {
    const pipeline = this.client.pipeline()
    keys.forEach(key=>pipeline.get(key))
    const response = await pipeline.exec()
    return response.map(item=>item[1])

  }

  async exists(key) {

    const response = await this.exists(key)

    return response === 1
  }

  async searchKey(pattern) {
    return this.keys(pattern)
  }

  onConnect(callback) {
    this.client.on('connect', callback)
  }

  onDisconnect(callback) {
    this.client.on('end', callback)
  }

  onError(callback) {
    this.client.on('error', err => callback(err))
  }

  onReconnect(callback) {
    this.client.on('reconnecting', callback)
  }
}

const db = new DataStore()

module.exports = db
