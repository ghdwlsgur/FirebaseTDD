'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

beforeEach(() => {
  jest.setTimeout();
});

const encryption = require('../encryption/encrypt');
const decryption = require('../encryption/decrypt');

describe('crypto code test', () => {
  it('양방향 암호화', async () => {
    // 사용자 토큰 + 사용자가 설정한 secret key를 이용하여 암복호화하기
    const crypto = require('crypto');

    // plainString 사용자가 지정한 암호화
    function encrypt(plainString, AesKey, AesIV) {
      const cipher = crypto.createCipheriv('aes-256-cbc', AesKey, AesIV);
      let encrypted = Buffer.concat([
        cipher.update(Buffer.from(plainString, 'utf8')),
        cipher.final(),
      ]);
      return encrypted.toString('base64');
    }
    function decrypt(base64String, AesKey, AesIV) {
      const decipher = crypto.createDecipheriv('aes-256-cbc', AesKey, AesIV);
      const deciphered = Buffer.concat([
        decipher.update(Buffer.from(base64String, 'base64')),
        decipher.final(),
      ]);
      return deciphered.toString('utf8');
    }

    // const key = Buffer.from(
    //   'J/PYjc1ftDFK5+77U1PB80v2TamokGap5yCIP2YI6tQ=',
    //   'base64',
    // );

    // password, salt , byte 순
    // 사용자가 지정한 비밀번호, 사용자가 토큰, 32바이트
    //============================================================
    // AesKey (사용자토큰, 사용자가 설정한 비밀번호)
    //============================================================
    const key = crypto.scryptSync('123123', '@#dsaf', 32);

    //============================================================
    // AesIv (사용자가 설정한 비밀번호)
    //============================================================
    const subIv = Buffer.from('1234', 'base64');
    const iv = [crypto.randomBytes(16)].concat(subIv);

    let encryptedData = encrypt('1234', key, iv[0]);
    console.log(`encryptedData: ${encryptedData}`);

    let decryptedData = decrypt(encryptedData, key, iv[0]);
    console.log(decryptedData);
  });

  it.only('test', async () => {
    const security = '1234';
    const userToken = '123123';
    const userPassword = '@#dsaf';
    let en = await encryption.encrypt(security, userToken, userPassword);

    // console.log(`en: ${en}`);
    // console.log(typeof en);
    // const de = decryption.decrypt(en, userToken, userPassword);
    // console.log(`de: ${de}`);
  });
});
// FyQx/F0HHZNyCRDAv39jPw==
// wnLYswkdFcse4bY1iVFKsw==
