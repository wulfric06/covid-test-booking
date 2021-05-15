const router = require('express').Router();
const { LabController } = require('../controllers');

router.post('/',

    (req, res) => {
        res.send('working');
    })

module.exports = router;
