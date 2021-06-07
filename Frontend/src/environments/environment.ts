export const environment = {
  production: false,

  title: document.title,
  name: require('package.json').name,
  version: require('package.json').version,
  publishDate: '2020-10-27 08:00',

  apiUrl: 'http://localhost:4114/',
  captchaUrl: '/captcha/',
  apiVersion: 202007071046
};
