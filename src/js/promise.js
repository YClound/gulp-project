// Promise 异步编程

const newPromise = () => {
  return new Promise((resolve, reject) => {
    resolve();
  });
}

newPromise().then(() => {
  console.log('1111111111')
})