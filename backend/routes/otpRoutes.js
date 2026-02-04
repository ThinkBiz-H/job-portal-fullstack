const express = require('express');
const router = express.Router();
const {
    sendOTP,
    verifyOTP,
    updateProfile
} = require('../controllers/otpController');
const { protect } = require('../middleware/authMiddleware');

router.post('/send', sendOTP);
router.post('/verify', verifyOTP);
router.put('/update-profile', protect, updateProfile);

module.exports = router;