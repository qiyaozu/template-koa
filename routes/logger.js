const loggerController = require('../controllers/logger.js');
const router = require('koa-router')();

router.post('/logger-add', loggerController.add)
router.post('/logger-rm', loggerController.remove)
router.post('/logger-list', loggerController.getAll)

module.exports = router;
