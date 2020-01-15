// 原型链
/** 关于 prototype 与__proto__
 * js中所有的函数都有一个 prototype 属性，该属性引用了一个对象，即原型对象，也简称原型
 * js对象有一个__proto__属性，指向它的构造函数的prototype属性
 * 对象.__proto__===函数.prototype; 
 * */

/**
 * var a = new A;
  //a 类型：对象
  //A 类型：函数

* var Object = new Function();
  //var 对象 = new 函数;

* Object.__proto__ === Function.prototype;
  //对象.__proto__ === 函数.prototype;

* Function.__proto__ === Function.prototype;
  //因为 Function 也是 Object
* */

/** new 操作符-返回一个对象
 * new 操作符会返回一个对象，所以我们需要在内部创建一个对象
 * 这个对象，也就是构造函数中的 this，可以访问到挂载在 this 上的任意属性
 * 这个对象可以访问到构造函数原型上的属性，所以需要将对象与构造函数链接起来
 * 返回原始值(基本类型)需要忽略，返回对象类型需要正常处理
*/
// js实现new操作符的功能
function create(Con, ...args) {
  var obj = {};
  Object.setPrototypeOf(obj, Con.prototype);
  var result = Con.apply(obj, args);
  // 判断Con返回的数据类型是否是对象
  return result instanceof Object ? result : obj;
}

function Test(name, age) {
  this.name = name;
  this.age = age;
}

Test.prototype.sayName = function () {
  console.log(this.name, this.age)
}

var t = create(Test, 'yarn', 20);
t.sayName()

