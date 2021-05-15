const router = require('express').Router();
const { UserController } = require('../controllers');

router.post(
    '/create',
    UserController.createNewUser
);

router.get(
    '/edit/:id',
    UserController.getUserById
);

router.put(
    '/update/:id',
    UserController.updateUserDetailById
);

router.delete(
    '/delete/:id',
    UserController.deleteUserById
);


module.exports = router;
