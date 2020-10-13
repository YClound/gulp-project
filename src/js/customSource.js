/**
 * 实现promise源码
 */
class PromiseSource {
  constructor(fn) {
    // 表示状态
    this.state = 'pending';

    this.successFun = [];

    this.failFun = [];

    let resolve = val => {
      if (this.state === 'pending') return;

      this.state = 'success';

      setTimeout(() => {
        this.successFun.forEach(item => item.call(this, val))
      })
    }

    let reject = err => {
      if (this.state === 'pending') return;

      this.state = 'fail';

      setTimeout(() => {
        this.failFun.forEach(item => item.call(this, err))
      })
    }

    try {
      fn(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(resovleCallback, rejectCallback) {
    resovleCallback = typeof resovleCallback !== 'function' ? v => v : rejectCallback;
    rejectCallback = typeof rejectCallback !== 'function' ? err => { throw err } : rejectCallback;

    return new PromiseSource((resolve, reject) => {
      this.successFun.push(val => {
        try {
          let x = resovleCallback(val);

          x instanceof PromiseSource ? x.then(resolve, reject) : resolve(x);
        } catch (error) {
          reject(error)
        }
      })

      this.failFun.push(val => {
        try {
          //    执行回调函数
          let x = rejectCallback(val);
          x instanceof Mypromise ? x.then(resolve, reject) : reject(x);
        } catch (error) {
          reject(error);
        }
      });
    })
  }
}

export {
  PromiseSource
}