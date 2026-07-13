const crypto = require('crypto');
const admin = require('./firebaseAdmin');

const handleRazorpayWebhook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers['x-razorpay-signature'];

    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(req.body);
    const digest = shasum.digest('hex');

    if (digest !== signature) {
      return res.status(403).send('Signature verification failed.');
    }

    const payload = JSON.parse(req.body.toString());
    const entity = payload.payload.payment?.entity || payload.payload.payment_link?.entity;

    if (entity) {
      const userId = entity.notes?.userId;

      if (userId) {
        const db = admin.firestore();
        const expiryDate = Date.now() + (30 * 24 * 60 * 60 * 1000);

        await db.collection('users').doc(userId).set({
          userId: userId,
          isPremium: true,
          expiryDate: expiryDate
        }, { merge: true });
      }
    }

    res.status(200).json({ status: 'ok' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { handleRazorpayWebhook };
