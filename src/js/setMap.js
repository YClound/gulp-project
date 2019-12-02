// import '@babel/polyfill';

// Set集合和Map集合
// 使用对象作为对象的属性 获取不同的属性 的值是一样的
const set = Object.create(null)
let key1 = { a: 1 }
let key2 = { b: 2 }
set[key1] = 'foo'
set[key2] = 'foo1'
console.log(set, set['[object Object]'])

/**
 * Set集合 - 是一种有序列表  类似于数组 且成员都是唯一的
 * 属性
 * size - 长度
 * 方法
 * add() 添加元素
 * has() 判断Set集合中 是否包含摸个元素
 * delete() 删除元素 
 * clear() 清除Set集合中的所有元素
 * */
const newSet = new Set([1, 1, 2]);
newSet.add(6);
newSet.add("6")
newSet.add(key1)
newSet.add(key2)
newSet.add("6")
newSet.delete("6")
// newSet.clear()
console.log(newSet, newSet.size, newSet.has(5)) // Set(0) {}[[Entries]]No propertiessize: (...)__proto__: Set 0 false

newSet.forEach((value, key, ownSet) => {
  console.log(value, key, ownSet, 'forEach循环')
})

let processor = {
  output(value) {
    console.log(value)
  },
  process(dataSet) {
    dataSet.forEach(function (value) {
      this.output(value);
    }, this)
  }
}

processor.process(newSet)

const newSet2 = new Set("1253671818");
console.log([...newSet2], 'set2')

// Set集合转换成数组
console.log('Set集合转换成数组:', [...newSet])
// for of 循环
for (const value of newSet) {
  console.log(value)
}

/**
 * 弱引用集合 WeakSet - 追踪对象的引用
 * 不可迭代不能使用for-of 无keys()和values()方法 不支持forEach()和size方法
 * add() - 参数是对象
 * has() - 非对象参数返回false
 * delete() 非对象参数返回false 
 * */
const newWeakSet = new WeakSet([key2]); // 构造函数不接受任何原始值 数组中的元素是对象
newWeakSet.add(key1);
key1 = null;
console.log(newWeakSet.size, newWeakSet.has(key1), newWeakSet) // undefined false, WeakSet {{…}}[[Entries]]0: Object__proto__: WeakSet
// newWeakSet.add('1') // Invalid value used in weak set
// newWeakSet.forEach((item) => {}) // newWeakSet.forEach is not a function


/**
 * Map集合-存储许多键值对的有序列表
 * set() 添加新元素
 * get() 获取信息 不存在键名返回undefined
 * has() 检测指定的键名在Map集合中是否已存在true/false
 * delete() 从Map集合中移除指定的键名和值
 * clear() 移除Map集合中的所有键值对
 * size - 键值对数量
 */

const newMap = new Map([['name', 'Tome']]);
newMap.set("name", "ES6");
newMap.set("age", 20);
newMap.set(key1, 'key1');
newMap.set(key2, 'key2')
console.log('newMap.get("age"):',newMap.get("age"), newMap.get(key1), newMap.get(key2))

// 遍历顺序-插入Map集合的顺序
newMap.forEach((value, key, ownerMap) => {
  console.log(value, key, ownerMap)
})

/**
 * WeakMap集合 - 键名必须是一个非null的对象
 * */ 

const newWeakMp = new WeakMap();
let element = document.querySelector('.element');
newWeakMp.set(element, "Original");
element.parentNode.removeChild(element);
element = null;
console.log(newWeakMp.has(element), newWeakMp, newWeakMp.get(element))
