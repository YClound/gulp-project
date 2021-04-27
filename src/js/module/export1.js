/**
 * AMD规范
 */
// define(function () {
//   console.log('module 2');
//   return {
//     getHello: function () {
//       return 'model2';
//     }
//   }
// });

/**
 * CMD规范
 */

// define(function (require, exports) {
//   console.log('module 2');
//   exports.getHello = function () {
//     return 'model2';
//   }
// });

/**
 * CommonJs规范
 */
let commonName = '顾亚南';

setTimeout(() => {
  commonName = '顾亚南1'
}, 10);

module.exports = {
  commonName,
  commonGithub: 'https://github.com/hua1995116'
}