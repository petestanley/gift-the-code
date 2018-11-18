const db = require('../adapter/datastore')

const handler = async (request, response) => {

  const { category } = request.query

  const categories = category.split(",")


  const promiseArray = categories.map(async (cate)=>{
    const keys = await db.searchKey(`${cate}-*`)
    const items = await db.retrieve(keys)
    return items.map(item=>JSON.parse(item))
  })

  const bannerObjs = await Promise.all(promiseArray)

  const data = bannerObjs.reduce((acc,item)=>{
    acc = acc.concat(item)
    return acc
  },[]).sort((a,b)=>b.createdAt - a.createdAt )

  response.json({
    data
  })
}

module.exports = handler
