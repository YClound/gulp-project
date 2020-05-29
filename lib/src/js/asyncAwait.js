async function timeout(flag) {
    if (flag) {
        return 'hello world';
    }
    else {
        throw 'my god, failure';
    }
}
timeout(true).then(result => {
    console.log(result);
}).catch(resp => {
    console.log(resp);
});
console.log(timeout(true));
console.log('虽然在后面，但是我先执行');
const doubleAfter2Seconds = function (num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(2 * num);
        }, 2000);
    });
};
const testResult = async function () {
    try {
        let result = await doubleAfter2Seconds(10);
        console.log('result:', result);
    }
    catch (e) {
        console.log('catch', e);
    }
};
testResult();
console.log('run end');
var process = async function (array) {
    for (let i of array) {
        await doSomething(i);
    }
};
console.log('---------test run--------');
async function test1() {
    console.log('start test1 -- 1');
    console.log(await test2());
    console.log('end test1 -- 7');
}
async function test2() {
    console.log('test2 -- 2');
    return 'return test2 value -- 6';
}
test1();
console.log('start async -- 3');
setTimeout(() => {
    console.log('setTimeout -- 9');
}, 0);
new Promise((resolve, reject) => {
    console.log('promise1 -- 4');
    resolve();
}).then(() => {
    console.log('promise2 -- 8');
});
console.log('end async -- 5');
function getFile(file) {
    const time = 2000 * Math.random();
    setTimeout((file, function () {
        fileReceived(file);
    }), time);
}
function fileReceived(file) {
    if (!responses[file]) {
        responses[file] = file;
    }
    const files = ['file1', 'file2', 'file3'];
    for (let i = 0; i < files.length; i++) {
        if (files[i] in responses) {
            if (responses[files[i]] !== true) {
                console.log(responses[files[i]]);
                responses[files[i]] = true;
            }
        }
        else {
            return false;
        }
    }
    console.log('Complete!');
}
const responses = {};
getFile('file1');
getFile('file2');
getFile('file3');
let processList = '', pid = '';
function start(id) {
    processList = !processList
        ? execute(id)
        : processList.then(() => execute(id));
}
function sleep() {
    const duration = Math.floor(Math.random() * 500);
    return new Promise(resolve => setTimeout(resolve, duration));
}
function execute(id) {
    return sleep().then(() => {
        console.log("id", id);
    });
}
for (let i = 0; i < 5; i++) {
    start(i);
}
//# sourceMappingURL=asyncAwait.js.map