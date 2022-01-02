'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const crypto = require('crypto');
/**=================================================
 * AesKey 생성
 * @param {string} userToken 유저 토큰
 * @param {string} userPassword 유저가 설정한 비밀번호
 * @returns {string} AesKey
 * @description userToken, 유저가 비밀번호를 등록하면 생성되는 토큰 정보
 */
function createAesKey(userToken, userPassword) {
  const AesKey = crypto.scryptSync(userToken, userPassword, 32);
  return AesKey;
}
exports.createAesKey = createAesKey;
