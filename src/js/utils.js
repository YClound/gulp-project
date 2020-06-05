// js通用的方法
/**
 * 格式化金钱
 */
export const ThousandNum = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const money = ThousandNum(1000.02); // 1,000.02

/**
 * 生成随机的ID
 */
export const RandomId = len => Math.random().toString(36).substr(3, len);
const id = RandomId(5); // knrrw 8位数


/**
 * 操作url查询参数
 * append: function append() { [native code] },
 * delete: function delete() { [native code] },
 * entries: function entries() { [native code] },
 * forEach: function forEach() { [native code] },
 * get: function get() { [native code] },
 * getAll: function getAll() { [native code] },
 * has: function has() { [native code] },
 * keys: function keys() { [native code] },
 * set: function set() { [native code] },
 * sort: function sort() { [native code] },
 * toString: function toString() { [native code] },
 * values: function values() { [native code] }
 */
export const locationParams = new URLSearchParams(location.search.replace(/\?/ig, ""));

/**
 * 生成随机HEX色值
 * #e8a065
 */
export const RandomColor = () => "#" + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0");

/**
 * 数组去重
 */
export const arrayRepeat = (arr) => [...new Set(arr)];

/**
 * 混淆数据
 */
export const mixArray = (arr) => arr.slice().sort(() => Math.random() - .5);

/**
 * 统计数组成员个数
 * reduce(function(total,currentValue, index,arr), initialValue)
 */
export const count = arr => arr.reduce((t, v) => {
  t[v] = t[v] ? ++t[v] : 1;
  return t;
}, {});

/**
 * 自适应页面
 * 页面基于一张设计图但需做多款机型自适应，元素尺寸使用rem进行设置
 * @param {*} width 
 */
export const AutoResponse = (width = 750) => {
  const target = document.documentElement;
  target.clientWidth >= 600
    ? (target.style.fontSize = "80px")
    : (target.style.fontSize = target.clientWidth / width * 100 + "px");
}


/**
 * 防抖（Debounce）- 函数触发时延迟指定的时间执行，如在延迟过程中函数又被触发，则重新计算执行时间
 * @fn : 要执行的函数
 * @delay : 每次执行函数的时间间隔
 * @immediate : 是否立即执行函数
 */
export function debounce(fn, delay = 500, immediate = false) {
  let timer;
  let immediateFn = immediate;
  return function (...args) {
    let context = this;
    timer && clearTimeout(timer);

    // 立即执行
    if (immediateFn) {
      immediateFn = false;
      fn.apply(context, args);
    }

    timer = setTimeout(function () {
      if (immediate) immediateFn = true;
      fn.apply(context, args)
    }, delay)
  }
}

/**
 * 节流（Throttle）- 函数连续触发时，在规定的时间内只会执行一次
 * @fn : 要执行的函数
 * @delay : 每次执行函数的时间间隔
 */
export function throttle(fn, delay) {
  let timer;
  return function (...args) {
    let context = this;
    if (timer) { return }
    timer = setTimeout(function () {
      timer = null;
      fn.apply(context, args);
    }, delay)
  }
}