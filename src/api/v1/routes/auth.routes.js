const router = require('express').Router();
const { AuthController } = require('../controllers');

router.post('/login',
    AuthController.login
);

// router.get('/logout',
//     AuthController.logout
// );

// router.post('/register',
//     AuthController.register
// );

module.exports = router;
