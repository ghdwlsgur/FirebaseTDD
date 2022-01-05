'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const crypto = require('crypto');
/**=================================================
 * AesIV 생성
 * @param {string} userPassword 유저가 설정한 비밀번호
 * @returns {string} AesIV
 */
function createAesIV(userPassword) {
  let arrayIV = [];
  const AesIV = crypto.randomBytes(16);
  arrayIV = AesIV.toString('base64').concat(userPassword);

  return arrayIV;
}
exports.createAesIV = createAesIV;
