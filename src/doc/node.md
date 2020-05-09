# node用法

## 全局变量
* process
* Buffer
* __dirname
* __filename

## node 模块(require, exports, module)
* 核心模块: Node 提供的内置模块
* 文件模块：用户编写的模块，可以是自己写的，也可以是通过 npm 安装的

### module对象
* id：模块的唯一标示符
* path和filename: 模块所在路径和文件名
* exports: 模块所导出的内容
* parent和children: 记录模块之间的导入关系
* loaded: 模块是否被加载
* paths: Node搜索文件模块的路径列表

### exports与module.exports区别
````
// 导出 add 函数
exports.add = add;
module.exports.add = add;

// 第二种导出方式，直接把 add 函数赋给 module.exports 对象
module.exports = add;

// 第一种导出方式，需要访问 add 属性获取到 add 函数
const myModule = require('myModule');
myModule.add(1, 2);

// 第二种导出方式，可以直接使用 add 函数
const add = require('myModule');
add(1, 2);
````

## 事件机制(events)
### EventEmitter
* on: 用来监听事件的发生
* emit: 用来触发新的事件