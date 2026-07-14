const express = require('express');
const router = express.Router();
const { handleRazorpayWebhook } = require('./razorpayWebhook');

router.post('/razorpay-webhook', handleRazorpayWebhook);

module.exports = router;
