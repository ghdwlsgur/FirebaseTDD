'use strict';

beforeEach(() => {
  jest.setTimeout();
});

const encryption = require('../encryption/encrypt');
const decryption = require('../encryption/decrypt');
const FIREBASE = require('../util/firebase');
const AesKey = require('../encryption/AesKey');
const AesIV = require('../encryption/AesIV');

describe.only('crypto code test', () => {
  it('양방향 암호화', async () => {
    // 사용자 토큰 + 사용자가 설정한 secret key를 이용하여 암복호화하기
    const crypto = require('crypto');
    const AesKey = 'UIpGMnSZi+...';
    const AesIV = 'aqAAm6mT99...';

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
    // const key = crypto.scryptSync('123123', '@#dsaf', 32);

    // //============================================================
    // // AesIv (사용자가 설정한 비밀번호)
    // //============================================================
    // const subIv = Buffer.from('1234', 'base64');
    // const iv = [crypto.randomBytes(16)].concat(subIv);

    // let encryptedData = encrypt('1234', key, iv[0]);
    // console.log(`encryptedData: ${encryptedData}`);

    // let decryptedData = decrypt(encryptedData, key, iv[0]);
    // console.log(decryptedData);
    let decryptedData = decrypt('cT7RLCgwFGVh3nQjp7IWBA==', AesKey, AesIV);
    console.log(decryptedData);
  });

  it.only('test', async () => {
    const security = '1234';
    const userToken = '123123';
    const userPassword = 'dasdasd@@11';
    // let en = encryption.encrypt(security, userToken, userPassword);

    // console.log(`en: ${en}`);
    const res = decryption.decrypt('a+hT6ST0f5+9069szkDj/g==');
    console.log(res);
  });

  it('test2', async () => {
    const doc = await FIREBASE.db
      .collection('userKey')
      .doc('aKDC5B160SyBVuXLRGiC')
      .get();

    const docref = doc.data();

    let test1 = docref.AesIV[0].toString('base64');
    let test2 = docref.AesKey.toString('base64');
    console.log(Buffer.from(test1, 'base64'));

    console.log(docref);
  });

  it('test3', async () => {
    const doc = await FIREBASE.db
      .collection('userKey')
      .doc('IMaLooxuD1uHxlviroeO')
      .get();

    const docref = await doc.data();
    const AesKey = docref.AesKey;
    const AesIV = docref.AesIV;

    console.log(`AesKey: ${Buffer.from(AesKey, 'base64')}`);
    console.log(`AesIV: ${Buffer.from(AesIV, 'base64')}`);
  });
});
// IMaLooxuD1uHxlviroeO
