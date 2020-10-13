import { PromiseSource } from './customSource';

// Promise 异步编程
const newPromise = () => {
  return new Promise((resolve, reject) => {
    console.log('1111111111')
    resolve();
  });
}

newPromise().then(() => {
  console.log('2222222')
  setTimeout(() => {
    console.log('3333333')
  }, 2000)
}).then((data) => {
  console.log('3333333', )
})


const a = 20
const promise1 = function(number) {
  return new Promise((resolve, reject) => {
    if (number > 10) {
        setTimeout(() => {
           resolve('success')
        }, 1000)
    } else {
      reject('fail')
    }
  });
}; 

const promise2 = new Promise((resolve, reject) =>  {
  setTimeout(() => { 
    resolve('success2')
  }, 1000)
})


Promise.all([a, promise1(2), 10, promise2, 2]).then((values) => {
  console.log('all', values)
}, (resp) => {
  console.log('all fail', resp)
}).catch((resp) => {
  console.log('all catch', resp)
})


console.log('结合generator函数')

let promiseSource1 = new PromiseSource((resolve, reject) => {
  setTimeout(() => {
    console.log('手动实现源码Promise')
    resolve(11111111)
  }, 1000)
})