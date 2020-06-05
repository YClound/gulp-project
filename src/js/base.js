// 对象
/** 
 * Object.freeze(obj)
 * Object.isFrozen(obj)
 */
// console.log('---------Object.freeze(obj)----------');
const obj = {
	prop: 42,
	name: 'Tom'
};

Object.freeze(obj);

// obj.prop = 33; // Cannot assign to read only property 'prop' of object '#<Object>'
// delete obj.name; //Cannot delete property 'name' of #<Object>
// Object.defineProperty(obj, 'age', { value: 17 }) // Cannot define property age, object is not extensible

// console.log(obj.prop, Object.isFrozen(obj));

// 描述符
/**
 * Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象
 * configurable - 当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。默认为 false；
 * enumerable - 当且仅当该属性的enumerable为true时，该属性才能够出现在对象的枚举属性中。默认为 false。
 **/
// console.log('---------Object.defineProperty()-----------');
const definePropertyObj = {};
Object.defineProperty(definePropertyObj, 'name', {
	value: "Tom",
	writable: true, // 当且仅当该属性的writable为true时，value才能被赋值运算符改变。默认为 false。
	enumerable: true,
	configurable: true
})

definePropertyObj.name = '222222'; // writable: false; => Cannot assign to read only property 'name' of object '#<Object>'

Object.defineProperty(definePropertyObj, 'name', {
	// configurable: false,
	writable: false
}) // configurable: false; => Cannot redefine property: name
// delete definePropertyObj.name; // configurable: false; =>Cannot delete property 'name' of #<Object>

// definePropertyObj.name = '333333';
// console.log(definePropertyObj)

// 数据描述符

// 存取描述符


// 数据类型检验
// 1.typeof 返回一个表示数据类型的字符串，返回结果包括：number、boolean、string、symbol、object、undefined、function 等 7 种数据类型，但不能判断 null、array 等
// console.log('------symbol------')
// console.log(typeof Symbol())

// console.log('------string------')
// console.log(typeof '111')

// console.log('------number------')
// console.log(typeof 20)
// console.log(typeof NaN)
// console.log(typeof +new Date())

// console.log('------undefined------')
// console.log(typeof undefined)

// console.log('------boolean------')
// console.log(typeof true)

// console.log('------function------')
// console.log(typeof new Function())

// console.log('------object------')
// console.log(typeof null)
// console.log(typeof [])
// console.log(typeof {})
// console.log(typeof new Date())
// console.log(typeof new RegExp())

// 2. instanceof 是用来判断 A 是否为 B 的实例，表达式为：A instanceof B，如果 A 是 B 的实例，则返回 true,否则返回 false。instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。
// console.log([] instanceof Array) // true
// console.log([] instanceof Object) // true
// console.log({} instanceof Object) // true
// console.log(new Function() instanceof Object) // true
// console.log(new Date() instanceof Date) // true
// console.log(new RegExp() instanceof RegExp) // true

// console.log(12 instanceof Number) // false
// console.log(new Number(12) instanceof Number) // true
// console.log(new Number(NaN) instanceof Number) // true

// console.log(null instanceof null) // Right-hand side of 'instanceof' is not an object

// 3.严格运算符=== 只能用于判断 null 和 undefined，因为这两种类型的值都是唯一的。

// 4.constructor 作用和 instanceof 非常相似。但 constructor 检测 Object 与 instanceof 不一样，还可以处理基本数据类型的检测。
var aa = [1, 2]
// console.log(aa.constructor === Array) // true
// console.log(aa.constructor === RegExp) // false
// console.log(aa.constructor === Object) // false

// console.log((1).constructor === Number) // true
// console.log((NaN).constructor === Number) // true

// console.log((null).constructor===Object) // Cannot read property 'constructor' of null

// 5.Object.prototype.toString.call() 最准确最常用的方式。首先获取 Object 原型上的 toString 方法，让方法执行，让 toString 方法中的 this 指向第一个参数的值
const getDataType = function (data) {
	let type = Object.prototype.toString.call(data)
	return type.slice(8, -1);
}

// console.log(getDataType('')) // String
// console.log(getDataType(12)) // Number
// console.log(getDataType(NaN)) // Number
// console.log(getDataType(true)) // Boolean
// console.log(getDataType(undefined)) // Undefined
// console.log(getDataType(null)) // Null
// console.log(getDataType({})) // Object
// console.log(getDataType(new Date())) // Date
// console.log(getDataType(new RegExp())) // RegExp
// console.log(getDataType([])) // Array
// console.log(getDataType(function () { })) // Function
// console.log(getDataType(Symbol())) // Symbol

// console.log(getDataType(new Error())) // Error
// console.log(getDataType(document)) // HTMLDocument
// console.log(getDataType(window)) // Window


// ES7新特性(2016)
// 1.Array.prototype.includes()
// console.log('Array.prototype.includes:', [1, 2, 3].includes(1))

// 指数操作符
// console.log('指数操作符**', 2 ** 10)
// console.log('指数运算Math.pow', Math.pow(2, 10))

/** ES8新特性(2017)
 * async/await
 * Object.values()
 * Object.entries()
 * String padding: padStart()和padEnd()，填充字符串达到当前长度
 * 函数参数列表结尾允许逗号
 * Object.getOwnPropertyDescriptors()
 * ShareArrayBuffer和Atomics对象，用于从共享内存位置读取和写入
*/
// String padding: padStart()和padEnd()，填充字符串达到当前长度
// console.log('0.0'.padStart(10, '12')) // "12121210.0"
// console.log('0.0'.padEnd(3, '12')) // "0.0"

// Object.getOwnPropertyDescriptors()-用来获取一个对象的所有自身属性的描述符,如果没有任何自身属性，则返回空对象。
const testObj = {
	name: 'Tom',
	get age() { return 20; }
}

// console.log(Object.getOwnPropertyDescriptors(testObj))
/**
 * [object Object] {
		age: [object Object] {
			configurable: true,
			enumerable: true,
			get: function get() {
					return 20;
				},
			set: undefined
		},
		name: [object Object] {
			configurable: true,
			enumerable: true,
			value: "Tom",
			writable: true
		}
	}
 */

/** ES9新特性（2018）
 * 异步迭代(iterators)
 * Promise.finally()
 * Rest/Spread 属性
 * 正则表达式命名捕获组（Regular Expression Named Capture Groups）- ?<name>
 * 正则表达式反向断言（lookbehind）
 * 正则表达式dotAll模式
 * 正则表达式 Unicode 转义
 * 非转义序列的模板字符串
*/


/** ES10新特性（2019）
 * 行分隔符（U + 2028）和段分隔符（U + 2029）符号现在允许在字符串文字中，与JSON匹配
 * 更加友好的 JSON.stringify
 * 新增了Array的flat()方法和flatMap()方法
 * 新增了String的trimStart()方法和trimEnd()方法
 * Object.fromEntries()
 * Symbol.prototype.description
 * String.prototype.matchAll
 * Function.prototype.toString()现在返回精确字符，包括空格和注释
 * 简化try {} catch {},修改 catch 绑定
 * 新的基本数据类型BigInt
 * globalThis
 * import()
 * Legacy RegEx
 * 私有的实例方法和访问器
*/

/**
 * @version 20200602
 * @description 函数
 */
console.log('111111', this, window)
