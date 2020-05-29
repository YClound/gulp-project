const set = Object.create(null);
let key1 = { a: 1 };
let key2 = { b: 2 };
set[key1] = 'foo';
set[key2] = 'foo1';
console.log(set, set['[object Object]']);
const newSet = new Set([1, 1, 2]);
newSet.add(6);
newSet.add("6");
newSet.add(key1);
newSet.add(key2);
newSet.add("6");
newSet.delete("6");
console.log(newSet, newSet.size, newSet.has(5));
newSet.forEach((value, key, ownSet) => {
    console.log(value, key, ownSet, 'forEach循环');
});
let processor = {
    output(value) {
        console.log(value);
    },
    process(dataSet) {
        dataSet.forEach(function (value) {
            this.output(value);
        }, this);
    }
};
processor.process(newSet);
const newSet2 = new Set("1253671818");
console.log([...newSet2], 'set2');
console.log('Set集合转换成数组:', [...newSet]);
for (const value of newSet) {
    console.log(value);
}
const newWeakSet = new WeakSet([key2]);
newWeakSet.add(key1);
key1 = null;
console.log(newWeakSet.size, newWeakSet.has(key1), newWeakSet);
const newMap = new Map([['name', 'Tome']]);
newMap.set("name", "ES6");
newMap.set("age", 20);
newMap.set(key1, 'key1');
newMap.set(key2, 'key2');
console.log('newMap.get("age"):', newMap.get("age"), newMap.get(key1), newMap.get(key2));
newMap.forEach((value, key, ownerMap) => {
    console.log(value, key, ownerMap);
});
const newWeakMp = new WeakMap();
let element = document.querySelector('.element');
newWeakMp.set(element, "Original");
element.parentNode.removeChild(element);
element = null;
console.log(newWeakMp.has(element), newWeakMp, newWeakMp.get(element));
//# sourceMappingURL=setMap.js.map