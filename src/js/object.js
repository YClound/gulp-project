// in、keys、values、Object.is()、for in
// 可迭代对象（iterator）-包含symbol.iterator属性的对象（所有集合对象数组、Set、Map和字符串）



/**
 * in操作符 - 如果指定的属性在指定的对象或其原型链中，则in 运算符返回true 处理对象和数组索引值
 * prop in objectName
 * prop - 一个字符串类型或者 symbol 类型的属性名或者数组索引（非symbol类型将会强制转为字符串）; objectName
检查它（或其原型链）是否包含具有指定名称的属性的对象
 *  */
// 数组
const arrayIn = new Array("redwood", "bay", "cedar", "oak", "maple");
console.log("0 in arrayIn: ", 0 in arrayIn)      // 返回true
console.log("6 in arrayIn: ", 6 in arrayIn)        // 返回false
console.log("'bay' in arrayIn: ", "bay" in arrayIn)   // 返回false (必须使用索引号,而不是数组元素的值)
console.log("'length' in arrayIn: ", "length" in arrayIn) // 返回true (length是一个数组属性)
console.log("Symbol.iterator in arrayIn: ", Symbol.iterator in arrayIn) // 返回true (数组可迭代，只在ES2015+上有效)

// 使用 delete 运算符删除了一个属性，则 in 运算符对所删除属性返回 false, 将一个属性的值赋值为undefined，而没有删除它，则 in 运算仍然会返回true。
delete arrayIn[3];
arrayIn[4] = undefined
console.log('delete [3]; [4]=undefined:', arrayIn, 3 in arrayIn, 4 in arrayIn) // ["redwood", "bay", "cedar", undefined, undefined] false true

// in右操作数必须是一个对象值。例如，你可以指定使用String构造函数创建的字符串，但不能指定字符串文字。
const newStrIn = new String('aaaaa');
console.log("'length' in newStrIn: ", 'length' in newStrIn) // true
// const strIn = 'aaaaa';
// console.log("'length' in strIn: ", 'length' in strIn) // Cannot use 'in' operator to search for 'length' in aaaaa


// for ... in 操作符 遍历对象
/**
  * for (variable in object)
    statement
  * variable- 在每次迭代时，variable会被赋值为不同的属性名。object-非Symbol类型的可枚举属性被迭代的对象。
 */


// for ... of 追踪集合内容
let newForof = [3, 4, 5];
let iteratorForof = newForof[Symbol.iterator]();
console.log(iteratorForof.next())

//  检测对象是否存在一个类型为函数的迭代器
let isIterable = (object) => {
  return typeof object[Symbol.iterator] === 'function';
}

console.log('检测数组是否可以迭代：', isIterable([1, 2, 3]));
console.log('检测字符串是否可以迭代：', isIterable('hello'));
console.log('检测Set集合是否可以迭代：', isIterable(new Set()));
console.log('检测WeakSet集合是否可以迭代：', isIterable(new WeakSet()));

// 创建可迭代对象 为对象增加Symbol.iterator生成器
let collection = {
  items: [],
  *[Symbol.iterator]() {
    for (let i = 0; i < this.items.length; i++) {
      yield this.items[i]
    }
  }
}

collection.items.push(7)
collection.items.push(8)
collection.items.push(9)

for (const value of collection) {
  console.log('自定义可迭代对象:', value)
}