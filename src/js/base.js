// 对象
/** 
 * Object.freeze(obj)
 * Object.isFrozen(obj)
 */
console.log('---------Object.freeze(obj)----------');
const obj = {
  prop: 42,
  name: 'Tom'
};

Object.freeze(obj);

// obj.prop = 33; // Cannot assign to read only property 'prop' of object '#<Object>'
// delete obj.name; //Cannot delete property 'name' of #<Object>
// Object.defineProperty(obj, 'age', { value: 17 }) // Cannot define property age, object is not extensible

console.log(obj.prop, Object.isFrozen(obj));

// 描述符
/**
 * Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象
 * configurable - 当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。默认为 false；
 * enumerable - 当且仅当该属性的enumerable为true时，该属性才能够出现在对象的枚举属性中。默认为 false。
 **/
console.log('---------Object.defineProperty()-----------');
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

definePropertyObj.name = '333333';
console.log(definePropertyObj)

// 数据描述符

// 存取描述符