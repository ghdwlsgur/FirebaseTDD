'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const crypto = require('crypto');
const FIREBASE = require('../util/firebase');
/**=================================================
 * 복호화
 * @param {string} base64String 복호화 대상
 * @param {string} AesKey 암호화시 생성한 AesKey
 * @param {string} AesIV 암호화시 생성한 AesIV
 * @returns {string}
 */
async function decrypt(base64String) {
  const doc = await FIREBASE.db
    .collection('userKey')
    .doc('gCs63ZTKfxaUuCnN7F73')
    .get();

  const docref = await doc.data();
  const AesKey = Buffer.from(docref.AesKey, 'base64');
  const AesIV = Buffer.from(docref.AesIV[0], 'base64');

  const decipher = crypto.createDecipheriv('aes-256-cbc', AesKey, AesIV);
  const deciphered = Buffer.concat([
    decipher.update(Buffer.from(base64String, 'base64')),
    decipher.final(),
  ]);

  return deciphered.toString('utf8');
}
exports.decrypt = decrypt;
