'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

exports.db = exports.auth = void 0;

const firebase = require('firebase-admin');
exports.firebase = firebase;
const serviceAccount = require('../config/adminsdk.json');

let isInitializeApp = false;
if (!isInitializeApp) {
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
  });
  isInitializeApp = true;
}

//===========================
//          Auth
//===========================
const auth = firebase.auth();
exports.auth = auth;

//===========================
//           DB
//===========================
const db = firebase.firestore();
exports.db = db;

const settings = { timestampsInSnapshots: true };
db.settings(settings);
