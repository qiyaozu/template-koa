const userRoute = require('./user')
const goodsRoute = require('./goods')
const imageRoute = require('./image')
const loggerRoute = require('./logger')
const router = require('koa-router')()

router.use('/api/user', userRoute.routes());

router.use('/api/goods',goodsRoute.routes());

router.use('/api', imageRoute.routes());

router.use('/api/logger', loggerRoute.routes());

module.exports = function () {
    return router.routes()
}