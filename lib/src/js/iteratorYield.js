function createIterator(items) {
    var i = 0;
    return {
        next: function () {
            var done = (i >= items.length);
            var value = !done ? items[i++] : undefined;
            return {
                done,
                value
            };
        }
    };
}
let iterator = createIterator([1, 2, 3]);
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log('---------生成器 * function---------');
const createYieldIterator = function* (items) {
    for (let i = 0; i < items.length; i++) {
        yield items[i];
    }
};
let yieldIterator = createYieldIterator([3, 4, 5]);
console.log(yieldIterator.next());
console.log(yieldIterator.next());
console.log(yieldIterator.next());
console.log(yieldIterator.next());
for (let o of yieldIterator) {
    console.log('yieldIterator执行完成', o);
}
let arrayObject = [1, 2, 3];
arrayObject.props = '2222222';
let setObject = new Set([4, 5, 6]);
let mapObject = new Map([['name', 'Tom'], ['age', 30]]);
console.log('-------for..of--------');
for (const value of arrayObject) {
    console.log('Array:', value);
}
for (const value of setObject) {
    console.log('Set:', value);
}
for (const [key, value] of mapObject) {
    console.log('Map:', key, value);
}
console.log('-----------entries()---------');
for (const value of arrayObject.entries()) {
    console.log('Array entries():', value, value[0], value[1]);
}
for (const value of setObject.entries()) {
    console.log('Set entries():', value, value[0], value[1]);
}
for (const value of mapObject.entries()) {
    console.log('Map entries():', value, value[0], value[1]);
}
console.log('-----------values()---------');
for (const value of arrayObject.values()) {
    console.log('Array values():', value);
}
for (const value of setObject.values()) {
    console.log('Set values():', value);
}
for (const value of mapObject.values()) {
    console.log('Map values():', value);
}
console.log('-----------keys()---------');
for (const value of arrayObject.keys()) {
    console.log('Array keys():', value);
}
for (const value of setObject.keys()) {
    console.log('Set keys():', value);
}
for (const value of mapObject.keys()) {
    console.log('Map keys():', value);
}
console.log('------------字符串迭代器-----------');
const stringIt = 'a b';
for (const value of stringIt) {
    console.log('字符串for-of:', value);
}
console.log('-----------NodeList迭代器---------');
const nodeList = document.getElementsByTagName('div');
for (const value of nodeList) {
    console.log(value.id, value.className);
}
console.log('-----------迭代器的高级用法---------');
const moreIterator = function* () {
    let init = 4;
    let first = yield init + 1;
    return;
    let second;
    try {
        second = yield first + 2;
    }
    catch (error) {
        second = 6;
    }
    yield second + 3;
};
const newMoreIterator = moreIterator();
console.log(newMoreIterator.next());
console.log(newMoreIterator.next(4));
console.log(newMoreIterator.next());
console.log('----------生成器委托------------');
const createNumberIterator = function* () {
    yield 1;
    yield 2;
    return 3;
};
const createCombinedIterator = function* () {
    const result = yield* createNumberIterator();
    yield result;
    for (let i = 0; i < result; i++) {
        yield 'repeat';
    }
};
const iteratorWt = createCombinedIterator();
console.log(iteratorWt.next());
console.log(iteratorWt.next());
console.log(iteratorWt.next());
console.log(iteratorWt.next());
console.log(iteratorWt.next());
const fetchData = function () {
    return function (callback) {
        setTimeout(() => {
            callback('data');
        }, 2000);
    };
};
const asycIterator = function* () {
    let first = yield fetchData();
    yield first + 2;
    yield 6;
};
const run = function (taskFef) {
    const task = taskFef();
    let result = task.next();
    const step = function () {
        if (!result.done) {
            console.log(result, '111111111');
            if (typeof result.value === 'function') {
                result.value((data) => {
                    console.log('callback', data);
                    result = task.next(10);
                    step();
                });
            }
            else {
                result = task.next();
                step();
            }
        }
    };
    step();
};
run(asycIterator);
//# sourceMappingURL=iteratorYield.js.map