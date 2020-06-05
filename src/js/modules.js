// 模块
// import c, { a, b } from './export';

// console.log(a, b, c, '22222222')

//  const { commonName, commonGithub } = require('./export1');
//  console.log(commonName, commonGithub, 'CommonJs规范')

/**
 * AMD规范
 */
// define([
//   'require',
// ], function (require, factory) {
//   const AMDModule1 = require('./export')
//   console.log(AMDModule1.getHello())
//   const AMDModule2 = require('./export1')
//   console.log(AMDModule2.getHello())
// });

/**
 * CMD规范
 */

// define([
//   'require',
// ], function (require, factory, module) {
//   const AMDModule1 = require('./export')
//   console.log(AMDModule1.getHello())
//   const AMDModule2 = require('./export1')
//   console.log(AMDModule2.getHello())
// });

/**
 * UMD规范-通用模块定义
 */

// const main = require('./export');
// console.log(main())


/**
 * CommonJs规范
 * require 命令用于输入其他模块提供的功能
 * 1.CommonJS 模块中 require 引入模块的位置不同会对输出结果产生影响，并且会生成值的拷贝
 * 2.CommonJS 模块重复引入的模块并不会重复执行，再次获取模块只会获得之前获取到的模块的缓存
 */
const { commonName, commonGithub } = require('./export1');
console.log('CommonJs规范:', commonName, commonGithub)

setTimeout(() => {
  // 重新获取module.exports的数据 是缓存的数据：commonName
  console.log('异步CommonJs规范:', require('./export1').commonName);
}, 100);

/**
 * ES Module
 * 关于 ES6 模块编译时执行会导致有以下两个特点：
 * 1.import 命令会被 JavaScript 引擎静态分析，优先于模块内的其他内容执行。
 * 2.export 命令会有变量声明提前的效果。
 */
import { name, github } from './export';
console.log('ES Module:', name, github)
// import * as esModule from './export';
// console.log('ES Module:', esModule)

setTimeout(() => {
  import('./export').then(({ name }) => {
    console.log('异步ES Module规范:', name)
  })
}, 100);
