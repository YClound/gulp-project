const arrayIn = new Array("redwood", "bay", "cedar", "oak", "maple");
console.log("0 in arrayIn: ", 0 in arrayIn);
console.log("6 in arrayIn: ", 6 in arrayIn);
console.log("'bay' in arrayIn: ", "bay" in arrayIn);
console.log("'length' in arrayIn: ", "length" in arrayIn);
console.log("Symbol.iterator in arrayIn: ", Symbol.iterator in arrayIn);
delete arrayIn[3];
arrayIn[4] = undefined;
console.log('delete [3]; [4]=undefined:', arrayIn, 3 in arrayIn, 4 in arrayIn);
const newStrIn = new String('aaaaa');
console.log("'length' in newStrIn: ", 'length' in newStrIn);
let newForof = [3, 4, 5];
let iteratorForof = newForof[Symbol.iterator]();
console.log(iteratorForof.next());
let isIterable = (object) => {
    return typeof object[Symbol.iterator] === 'function';
};
console.log('检测数组是否可以迭代：', isIterable([1, 2, 3]));
console.log('检测字符串是否可以迭代：', isIterable('hello'));
console.log('检测Set集合是否可以迭代：', isIterable(new Set()));
console.log('检测WeakSet集合是否可以迭代：', isIterable(new WeakSet()));
let collection = {
    items: [],
    *[Symbol.iterator]() {
        for (let i = 0; i < this.items.length; i++) {
            yield this.items[i];
        }
    }
};
collection.items.push(7);
collection.items.push(8);
collection.items.push(9);
for (const value of collection) {
    console.log('自定义可迭代对象:', value);
}
//# sourceMappingURL=object.js.map