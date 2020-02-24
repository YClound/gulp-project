// const a = 'aaaaaaa';
// const b = 'bbbbbbb'
// export { a, b }

// const c = 21;
// export default c;

/**
 * CommonJs规范（NodeJs）
 * 主要运行于服务器端，该规范指出，一个单独的文件就是一个模块。
 * 采用同步加载模块，而加载的文件资源大多数在本地服务器，所以执行速度或时间没问题。但是在浏览器端，限于网络原因，更合理的方案是使用异步加载。
 * 四个重要的环境变量为模块化的实现提供支持：module、exports、require、global。
 * require 命令用于输入其他模块提供的功能。
 * module.exports命令用于规范模块的对外接口。
 */

// const commonName = '顾亚南';
// module.exports = {
//   commonName,
//   commonGithub: 'https://github.com/hua1995116'
// }

/**
 * AMD规范 - 异步模块定义 （RequireJS）
 * 采用异步方式加载模块，模块的加载不影响它后面语句的运行。
 * 模块功能主要的几个命令：define、require、return和define.amd
 * define是全局函数，用来定义模块,define(id?, dependencies?, factory);
 * require命令用于输入其他模块提供的功能;
 * return命令用于规范模块的对外接口;
 * define.amd属性是一个对象，此属性的存在来表明函数遵循AMD规范。
 */

// define(function () {
//   console.log('module 1');
//   return {
//     getHello: function () {
//       return 'model1';
//     }
//   }
// });

/**
 * CMD规范-通用模块定义
 */
// define(function (require, exports) {
//   console.log('module 1');
//   exports.getHello = function () {
//     return 'model1';
//   }
// });

/**
 * UMD规范-通用模块定义
 * 该模式主要用来解决CommonJS模式和AMD模式代码不能通用的问题，并同时还支持老式的全局变量规范
 */
// (function (global, factory) {
//   typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
//     typeof define === 'function' && define.amd ? define(factory) :
//       (global = global || self, global.myBundle = factory());
// }(this, (function () {
//   var main = () => {
//     return 'hello world!'
//   }
//   return main;
// })))

/**
 * ES modules（ESM）是 JavaScript 官方的标准化模块系统。
 * 1.它因为是标准，所以未来很多浏览器会支持，可以很方便的在浏览器中使用。(浏览器默认加载不能省略.js)
 * 2.它同时兼容在node环境下运行。
 * 3.模块的导入导出，通过import和export来确定。可以和Commonjs模块混合使用。
 * 4.ES modules 输出的是值的引用，输出接口动态绑定，而 CommonJS 输出的是值的拷
 * 5.ES modules 模块编译时执行，而 CommonJS 模块总是在运行时加载
 */
export let name = 'guyanan';
export let github = 'guyanan github';

setTimeout(() => {
  name = "guyanan1";
}, 10)

console.log('es Module 导出模块')

