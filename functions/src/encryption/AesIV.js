'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const crypto = require('crypto');
/**=================================================
 * AesIV 생성
 * @param {string} userPassword 유저가 설정한 비밀번호
 * @returns {string} AesIV
 */
function createAesIV(userPassword) {
  const subIv = Buffer.from(userPassword, 'base64');
  const AesIV = [crypto.randomBytes(16)].concat(subIv);

  return AesIV;
}
exports.createAesIV = createAesIV;
