const userController = require('../controllers/user.js');
const router = require('koa-router')();
router.get('/test', userController.test)
router.post('/login', userController.login)
router.post('/code', userController.getCode)
router.post('/register', userController.register)
router.post('/face_score', userController.getScore)

module.exports = router;
