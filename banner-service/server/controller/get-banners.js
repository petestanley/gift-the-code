const db = require('../adapter/datastore')

const handler = async (request, response) => {

  const { category } = request.query

  const categories = category.split(",")

  const promiseArray = categories.map(async (cate)=>{
    const keys = await db.searchKey(`${cate}-*`)
    const items = await db.retrieve(keys)
    return {
      data: items,
      category: cate
    }
  })

  const bannerObjs = await Promise.all(promiseArray)

  const responseData =  bannerObjs.reduce((acc, item)=>{
      acc[item.category] = JSON.parse(item.data)
      return acc
  }, {})

  response.json(responseData)
}

module.exports = handler
