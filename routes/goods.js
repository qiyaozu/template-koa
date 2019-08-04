const goodsController = require('../controllers/goods');
const router = require('koa-router')();

router.post('/detail', goodsController.getGoodsDetails);
router.post('/add', goodsController.addGoods);
router.post('/list', goodsController.getGoodsList);
router.delete('/:id', goodsController.removeGoods);
router.post('/management', goodsController.manageGoods);

module.exports = router
