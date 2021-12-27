'use strict';

const firebase = require('firebase-admin');
const serviceAccount = require('../config/adminsdk.json');
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://test-9f6df.firebaseio.com',
});

export default firebase;
