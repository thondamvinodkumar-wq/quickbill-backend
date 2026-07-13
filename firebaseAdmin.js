const admin = require('firebase-admin');

try {
  let credentials;
  if (process.env.FIREBASE_CREDENTIALS_JSON) {
    credentials = JSON.parse(process.env.FIREBASE_CREDENTIALS_JSON);
  }

  if (credentials) {
    admin.initializeApp({
      credential: admin.credential.cert(credentials),
    });
  } else {
    admin.initializeApp();
  }
} catch (error) {
  console.error(error);
}

module.exports = admin;
