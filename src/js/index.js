import { debounce, throttle } from './utils';
let ipt = document.getElementById('dounceThrottleInput');
// let handler = debounce(handleSendPhone, 500, true);
//handler：debounce执行后return的函数。
let handler = throttle(handleSendPhone, 1000);

ipt.addEventListener('input', function () {
  let val = this.value;
  handler(val);
});

// 请求接口
function handleSendPhone(val) {
  console.log(val, 'debounce')
}