'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const crypto = require('crypto');
const createAesKey = require('./AesKey');
const createAesIV = require('./AesIV');
const FIREBASE = require('../util/firebase');

/**=================================================
 * 암호화
 * @param {string} plainString 암호화 대상
 * @param {string} userToken 유저토큰
 * @param {string} userPassword 유저가 생성한 비밀번호
 * @returns {string}
 */
function encrypt(plainString, userToken, userPassword) {
  const AesKey = createAesKey.createAesKey(userToken, userPassword);
  const AesIV = createAesIV.createAesIV();
  const stringKey = AesKey.toString('base64');
  const stringIV = AesIV.toString('base64');

  const res = FIREBASE.db.collection('userKey').add({
    AesKey: stringKey,
    AesIV: stringIV,
    cdt: getTimestampNow(),
  });

  const cipher = crypto.createCipheriv('aes-256-cbc', AesKey, AesIV);
  let encrypted = Buffer.concat([
    cipher.update(Buffer.from(plainString, 'utf8')),
    cipher.final(),
  ]);

  return encrypted.toString('base64');
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
