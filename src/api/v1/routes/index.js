const router = require('express').Router();

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const labRoutes = require('./labs.routes');
const testRoutes = require('./test.routes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/labs', labRoutes);
router.use('/tests', testRoutes);

module.exports = router;
