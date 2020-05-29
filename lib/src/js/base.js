console.log('---------Object.freeze(obj)----------');
const obj = {
    prop: 42,
    name: 'Tom'
};
Object.freeze(obj);
console.log(obj.prop, Object.isFrozen(obj));
console.log('---------Object.defineProperty()-----------');
const definePropertyObj = {};
Object.defineProperty(definePropertyObj, 'name', {
    value: "Tom",
    writable: true,
    enumerable: true,
    configurable: true
});
definePropertyObj.name = '222222';
Object.defineProperty(definePropertyObj, 'name', {
    writable: false
});
console.log(definePropertyObj);
console.log('------symbol------');
console.log(typeof Symbol());
console.log('------string------');
console.log(typeof '111');
console.log('------number------');
console.log(typeof 20);
console.log(typeof NaN);
console.log(typeof +new Date());
console.log('------undefined------');
console.log(typeof undefined);
console.log('------boolean------');
console.log(typeof true);
console.log('------function------');
console.log(typeof new Function());
console.log('------object------');
console.log(typeof null);
console.log(typeof []);
console.log(typeof {});
console.log(typeof new Date());
console.log(typeof new RegExp());
console.log([] instanceof Array);
console.log([] instanceof Object);
console.log({} instanceof Object);
console.log(new Function() instanceof Object);
console.log(new Date() instanceof Date);
console.log(new RegExp() instanceof RegExp);
console.log(12 instanceof Number);
console.log(new Number(12) instanceof Number);
console.log(new Number(NaN) instanceof Number);
var aa = [1, 2];
console.log(aa.constructor === Array);
console.log(aa.constructor === RegExp);
console.log(aa.constructor === Object);
console.log((1).constructor === Number);
console.log((NaN).constructor === Number);
const getDataType = function (data) {
    let type = Object.prototype.toString.call(data);
    return type.slice(8, -1);
};
console.log(getDataType(''));
console.log(getDataType(12));
console.log(getDataType(NaN));
console.log(getDataType(true));
console.log(getDataType(undefined));
console.log(getDataType(null));
console.log(getDataType({}));
console.log(getDataType(new Date()));
console.log(getDataType(new RegExp()));
console.log(getDataType([]));
console.log(getDataType(function () { }));
console.log(getDataType(Symbol()));
console.log(getDataType(new Error()));
console.log(getDataType(document));
console.log(getDataType(window));
console.log('Array.prototype.includes:', [1, 2, 3].includes(1));
console.log('指数操作符**', 2 ** 10);
console.log('指数运算Math.pow', Math.pow(2, 10));
console.log('0.0'.padStart(10, '12'));
console.log('0.0'.padEnd(3, '12'));
const testObj = {
    name: 'Tom',
    get age() { return 20; }
};
console.log(Object.getOwnPropertyDescriptors(testObj));
//# sourceMappingURL=base.js.map