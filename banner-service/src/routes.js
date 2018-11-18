const config = require('./config')
const router = require('express-promise-router')()
const fs = require('fs')
const path = require('path')
const getBanners = require('./controller/get-banners')
const postBanner = require('./controller/post-banner')

router.get('/banners', getBanners)
router.post('/banners',postBanner)

module.exports = router
