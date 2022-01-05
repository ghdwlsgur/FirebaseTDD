'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

beforeEach(() => {
  jest.useFakeTimers();
});

const AESIV = require('../encryption/AesIV');
const AESKEY = require('../encryption/AesKey');
const ENCRYPT = require('../encryption/encrypt');

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
    const AesKey = '֋�S%��든�s����Γ1���9Q�';
    const AesIV = 'X9JDBafY3wpJMAqaqX5KFQ==1111';
    const plainString = 'hihello';
    const res = ENCRYPT.encrypt(plainString, AesKey, AESIV);
    console.log(`res: ${res}`);
  });
});
