// 同步 await async
// async的用法 - async 函数返回的是一个promise 对象
async function timeout(flag) {
  if (flag) {
    return 'hello world' // resolve()
  } else {
    throw 'my god, failure' // reject()
  }
}

timeout(true).then(result => {
  console.log(result);
}).catch(resp => {
  console.log(resp)
})

// timeout(false)
console.log(timeout(true));
console.log('虽然在后面，但是我先执行');


// await的用法 - await 关键字只能放到async 函数里面,  await new Promise
const doubleAfter2Seconds = function (num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2 * num)
      // reject(2 * num)
    }, 2000);
  })
}

const testResult = async function () {
  try {
    let result = await doubleAfter2Seconds(10);
    console.log('result:', result)
  } catch (e) {
    console.log('catch', e)
  }
}

testResult();

console.log('run end');

// 异步迭代
var process = async function (array) {
  for (let i of array) {
    await doSomething(i)
  }
}

// js EventLoop 事件循环机制
console.log('---------test run--------')
async function test1() {
  console.log('start test1 -- 1');
  console.log(await test2());
  console.log('end test1 -- 7')
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

console.log('end async -- 5')


/** javscript各种异步模式
 * callback - 回调函数
 *  
*/

// callback
function getFile(file) {
  const time = 2000 * Math.random();
  setTimeout((file, function () {
    fileReceived(file)
  }), time)
}


function fileReceived(file) {
  if (!responses[file]) {
    responses[file] = file;
  }

  const files = ['file1', 'file2', 'file3']; // 根据函数传参定义函数执行的顺序

  for (let i = 0; i < files.length; i++) {
    if (files[i] in responses) {
      if (responses[files[i]] !== true) {
        console.log(responses[files[i]])
        responses[files[i]] = true; // 依次打印执行的数据
      }
    } else {
      return false
    }
  }
  console.log('Complete!')
}

const responses = {}; // 记录函数是否执行过
// 顺序执行
getFile('file1')
getFile('file2')
getFile('file3')

// thunk 是一种函数，其返回值也是一个函数

let processList = '', pid = '';
function start(id) {
  // if (!processList) processList = [];
  // processList.push({ id: id });
  // clearTimeout(pid);
  // pid = setTimeout(() => {
  //   (async () => {
  //     let target = processList.shift();
  //     console.log(target, processList.length)
  //     while(target){
  //       await execute(target.id);
  //       target = processList.shift();
  //     }
  //   })();
  // }, 0);
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

// 测试代码 (请勿更改):
for (let i = 0; i < 5; i++) {
  start(i);
}




