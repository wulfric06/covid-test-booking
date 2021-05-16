const router = require('express').Router();
const { LabController } = require('../controllers');

router.post('/',
    LabController.getAllLabs
);

module.exports = router;
