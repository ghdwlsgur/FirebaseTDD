'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const crypto = require('crypto');
const AESKEY = require('./AesKey');
const AESIV = require('./AesIV');
const FIREBASE = require('../util/firebase');

/**=================================================
 * 암호화
 * @param {string} plainString 암호화 대상
 * @param {string} userToken 유저토큰
 * @param {string} userPassword 유저가 생성한 비밀번호
 * @returns {string}
 */
function encrypt(plainString, userToken, userPassword) {
  return new Promise((resolve, reject) => {
    const AesKey = Buffer.from(
      AESKEY.createAesKey(userToken, userPassword),
      'base64',
    );
    const AesIV = Buffer.from(AESIV.createAesIV(userPassword), 'base64');

    const cipher = crypto.createCipheriv('aes-256-cbc', AesKey, AesIV);
    let encrypted = Buffer.concat([
      cipher.update(Buffer.from(plainString, 'utf8')),
      cipher.final(),
    ]);

    const doc = {
      AesKey: AesKey,
      AesIV: AesIV,
    };

    const res = {
      id: setUserKeyDoc(doc),
      encrypted: encrypted.toString('base64'),
    };

    resolve(JSON.stringify(res));
  });
}
exports.encrypt = encrypt;

/**=================================================
 * 현재 시간 반환
 * @returns {timestamp}
 */
function getTimestampNow() {
  return FIREBASE.firebase.firestore.Timestamp.now();
}
exports.getTimestampNow = getTimestampNow;

async function setUserKeyDoc(doc) {
  const now = getTimestampNow();

  doc.udt = now;

  if (doc.id) {
    const beforeDoc = await FIREBASE.db.collection('userKey').doc(doc.id).get();

    if (!beforeDoc.exists) {
      doc.cdt = now;
      doc.is_visible = true;
    }

    await FIREBASE.db
      .collection('userKey')
      .doc(doc.id)
      .set({ ...doc }, { merge: true });
  } else {
    doc.is_visible = true;
    doc.cdt = now;
    const res = await FIREBASE.db.collection('userKey').add({ ...doc });
    doc.id = res.id;
    await FIREBASE.db
      .collection('userKey')
      .doc(doc.id)
      .set({ id: res.id }, { merge: true });
  }

  return doc.id;
}
exports.setUserKeyDoc = setUserKeyDoc;
