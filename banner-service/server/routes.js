const config = require('./config')
const router = require('express-promise-router')()
const fs = require('fs')
const path = require('path')
const getBanners = require('./controller/get-banners')
const postBanner = require('./controller/post-banner')
const express = require('express')

router.get('/banners', getBanners)
router.post('/banners',postBanner)

router.get('/admin', (req,res)=>{
  res.sendFile(path.resolve('ui/index.html'))
})

module.exports = router
