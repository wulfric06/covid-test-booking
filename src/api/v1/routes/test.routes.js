const router = require('express').Router();
const { TestController } = require('../controllers');
const { MulterMiddleware } = require('../middlewares');

router.post(
    '/create',
    MulterMiddleware.upload.single('image'),
    TestController.createNewTest
);

// router.get(
//     '/edit/:id',
//     UserController.getUserById
// );

// router.put(
//     '/update/:id',
//     UserController.updateUserDetailById
// );

// router.delete(
//     '/delete/:id',
//     UserController.deleteUserById
// );


module.exports = router;
