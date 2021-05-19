const router = require('express').Router();
const { LabController } = require('../controllers');

router.post('/',
    LabController.getAllLabs
);

router.get('/get-booking-details/:id',
    LabController.getBookingDetailsForLab
)

module.exports = router;
