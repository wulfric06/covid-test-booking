const router = require('express').Router();
const { TestController } = require('../controllers');
const { MulterMiddleware } = require('../middlewares');

router.post(
    '/create',
    MulterMiddleware.upload.single('image'),
    TestController.createNewTest
);

module.exports = router;
