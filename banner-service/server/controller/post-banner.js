const db = require('../adapter/datastore')
const constants = require('./constants')

const handler = async (request, response) => {

  const { banner } = request.query

  const { category, content } = request.body
  if (constants.includes(category)){

    const createdAt = Date.now()
    const updatedAt = createdAt
    const id = `${category}-${createdAt}`
    const data = {
        id,
        content,
        createdAt,
        updatedAt,
    }
    await db.store(id, JSON.stringify(data))
    response.sendStatus(204)

  }else{
      response.status(400).send({
        error: `Unrecognized category ${category}`
      })
  }
}

module.exports = handler
