'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

exports.firebase = exports.db = exports.auth = void 0;

const firebase = require('firebase-admin');
const serviceAccount = require('../config/adminsdk.json');

let isInitializeApp = false;
if (!isInitializeApp) {
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
  });
  isInitializeApp = true;
}

const auth = firebase.auth();
exports.auth = auth;

const db = firebase.firestore();
exports.db = db;

const settings = { timestampsInSnapshots: true };
db.settings(settings);
