'use strict';

beforeEach(() => {
  jest.setTimeout();
});

const MAIL = require('../util/nodemailer');
test('nodemailer() test', async () => {
  const destination = 'redmax45@naver.com';
  const res = await MAIL({ destination });
  console.log(res);
});
