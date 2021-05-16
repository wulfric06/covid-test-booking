const router = require('express').Router();
const { TestController } = require('../controllers');
const { MulterMiddleware } = require('../middlewares');

router.post(
    '/create',
    MulterMiddleware.upload.single('image'),
    TestController.createNewTest
);

router.get(
    '/edit/:id',
    TestController.getTestById
);

router.get('/:id',
    TestController.getAllTestOfUser
);

router.delete('/delete/:id',
    TestController.deleteTestById
)


module.exports = router;
