const FIREBASE = require('../util/firebase');
async function convertStringToBuffer(id) {
  const doc = await FIREBASE.db.collection('userKey').doc(id).get();
  const docRef = await doc.data();

  const AesKey = Buffer.from(docRef.AesKey, 'base64');
  const AesIV = Buffer.from(docRef.AesIV, 'base64');

  const res = {
    AesKey,
    AesIV,
  };

  return res;
}
exports.convertStringToBuffer = convertStringToBuffer;
