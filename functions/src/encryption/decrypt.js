'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const crypto = require('crypto');
const CONVERT = require('../convert/convertBuffer');
const FIREBASE = require('../util/firebase');
/**=================================================
 * 복호화
 * @param {string} base64String 복호화 대상
 * @param {string} AesKey 암호화시 생성한 AesKey
 * @param {string} AesIV 암호화시 생성한 AesIV
 * @returns {string}
 */
async function decrypt(doc) {
  const getDoc = await FIREBASE.db.collection('userKey').doc(doc.id).get();
  const docRef = await getDoc.data();

  const AesKey = docRef.AesKey;
  const AesIV = docRef.AesIV;

  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(AesKey, 'base64'),
    Buffer.from(AesIV, 'base64'),
  );

  const deciphered = Buffer.concat([
    decipher.update(Buffer.from(doc.encrypted, 'base64')),
    decipher.final(),
  ]);

  return Buffer.from(deciphered, 'utf8').toString('base64');
}
exports.decrypt = decrypt;
