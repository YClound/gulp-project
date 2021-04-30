import { outputDom } from '../utils/operateDom';

const target = {
  balance: '2021',
  name: 'Georgy Glezer!',
};

const handler = {
  get: function (target, prop, receiver) {
    console.log('------分割线(get操作)------');
    console.table({ target, prop, receiver });
    if (prop === 'balance') {
      console.log(`Current Balance Of: ${target.name} Is: ${target.balance} `)
    }

    return target[prop];
  },

  set: function (target, prop, value) {
    console.log('------分割线(set操作)------');
    console.table({ target, prop, value })
    if (prop === 'age') {
      // 通过代理，你可以轻松地验证向一个对象的传值
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      } else {
        console.log(`Current age Of: ${target.name} Is: ${value} `)
      }
    }

    target[prop] = value;
    return true;
  }
};

const proxy = new Proxy(target, handler);

/**
 * 无操作转发代理
 * 在以下例子中，我们使用了一个原生 JavaScript 对象，代理会将所有应用到它的操作转发到这个对象上。
 */
proxy.age = 20;

// console.log('------分割线------');
proxy.balance

// 设置target
target.sex = 'male';

console.log('------分割线(proxy)------');
console.table(proxy);

console.log('------分割线(target)------');
console.table(target);

// proxy.age = 'y';