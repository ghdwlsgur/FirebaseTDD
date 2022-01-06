'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const crypto = require('crypto');
const CONVERT = require('../convert/convertBuffer');
/**=================================================
 * 복호화
 * @param {string} base64String 복호화 대상
 * @param {string} AesKey 암호화시 생성한 AesKey
 * @param {string} AesIV 암호화시 생성한 AesIV
 * @returns {string}
 */
function decrypt(base64String) {
  return new Promise((resolve, reject) => {
    const field = CONVERT.convertStringToBuffer('111111');

    const AesIV = field.AesIV;
    const AesKey = field.AesKey;
    console.log(`AesIV: ${AesIV}`);
    console.log(`AesKey: ${AesKey}`);

    const decipher = crypto.createDecipheriv('aes-256-cbc', AesKey, AesIV);
    const deciphered = Buffer.concat([
      decipher.update(Buffer.from(base64String, 'base64')),
      decipher.final(),
    ]);

    resolve(deciphered.toString('utf8'));
  });
}
exports.decrypt = decrypt;
