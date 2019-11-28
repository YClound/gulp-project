// Set集合和Map集合
// 使用对象作为对象的属性 获取不同的属性 的值是一样的
const set = Object.create(null)
const key1 = { a: 1 }
const key2 = { b: 2 }
set[key1] = 'foo'
set[key2] = 'foo1'
console.log(set, set['[object Object]'])

/**
 * in操作符 - 如果指定的属性在指定的对象或其原型链中，则in 运算符返回true
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
console.log(arrayIn, 3 in arrayIn, 4 in arrayIn) // ["redwood", "bay", "cedar", undefined, undefined] false true

// in右操作数必须是一个对象值。例如，你可以指定使用String构造函数创建的字符串，但不能指定字符串文字。
const newStrIn = new String('aaaaa');
const strIn = 'aaaaa';
console.log("'length' in str: ", 'length' in newStrIn, "  'length' in strIn: ", 'length' in strIn) // true, false

/**
 * Set集合 
 * 属性
 * size - 长度
 * 方法
 * add() 添加元素
 * delete() 删除元素 
 * clear() 清除Set集合
 * */
const newSet = new Set([1, 1, 2]);
newSet.add(6);
newSet.add("6")
newSet.add(key1)
newSet.add(key2)
newSet.add("6")
newSet.delete("6")
newSet.clear()
console.log(newSet, newSet.size, newSet.has(5))