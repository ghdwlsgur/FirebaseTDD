'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

beforeEach(() => {
  jest.setTimeout(() => {}, 5000);
});

const AESIV = require('../encryption/AesIV');
const AESKEY = require('../encryption/AesKey');
const ENCRYPT = require('../encryption/encrypt');
const DECRYPT = require('../encryption/decrypt');
const FIREBASE = require('../util/firebase');

describe('AesIV.js code test', () => {
  it('createAesIV() code test', async () => {
    const userPassword = '1111';
    const res = AESIV.createAesIV(userPassword);
    console.log(`res: ${res}`);
  });

  it('createAesKey() code test', async () => {
    const userToken = '1231';
    const userPassword = '1111';
    const res = AESKEY.createAesKey(userToken, userPassword);
    console.log(`res: ${res}`);
  });

  it.only('encrypt() code test', async () => {
    const userToken = '11122';
    const userPassword = '1234';
    const plainString = 'hihello';
    const result = await ENCRYPT.encrypt(
      plainString,
      userToken,
      userPassword,
    ).then();
    const result2 = await DECRYPT.decrypt(result).then();
    console.log(result2);
  });

  it('test', async () => {
    const doc = await FIREBASE.db
      .collection('userKey')
      .doc('5bfQW4zTWBOtiUaZ7Pkr')
      .get();
    const docRef = doc.data();
    console.log(docRef.AesIV);
  });
});
