// https://mp.weixin.qq.com/s/RkFCm2HRPsCavbILGzL0uA
/**
 * 何时可见
 * FP:  First Paint，第一个像素点被绘制在屏幕上的时刻。
 * FCP: First Contentful Pain 第一个内容（文本/SVG/Image等）被绘制在屏幕上的时刻。
 */
const observer = new PerformanceObserver(function (list) {
  const perfEnteries = list.getEntries();
  for (let i = 0; i < perfEnteries.length; i++) {
    const item = perfEnteries[i];
    console.log('entryType: ', item.entryType)
  }
})

observer.observe({ entryTypes: ['paint'] });


/**
 * 何时可用
 * LCP: Largest Contentful Paint，代表着页面最大元素被绘制在屏幕上的时刻
 */

// observer.observe({entryTypes: ['largest-contentful-paint']});

/**
 * 何时可交互
 * TTI: Time To Interactive，代表着页面稳定可交互的时间
 * FID: First Input Delay，代表着用户第一次交互处理所消耗的时间
 */
// observer.observe({entryTypes: ['longtask']});
// 网络请求同样可以通过PerformanceObserver获取：
// observer.observe({entryTypes: ["resource"]});


observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'longtask', 'resource'] });


// 采集FID
// We can also directly query the first input information.
new PerformanceObserver(function (list, obs) {
  const firstInput = list.getEntries()[0];

  // Measure the delay to begin processing the first input event.
  const firstInputDelay = firstInput.processingStart - firstInput.startTime;

  // Measure the duration of processing the first input event.
  // Only use when the important event handling work is done synchronously in the handlers.
  const firstInputDuration = firstInput.duration;

  // Obtain some information about the target of this event, such as the id.
  const targetId = firstInput.target ? firstInput.target.id : 'unknown-target';

  // Process the first input delay and perhaps its duration...
  console.log(firstInputDelay, firstInputDuration, targetId)

  // Disconnect this observer since callback is only triggered once.
  obs.disconnect();
}).observe({ type: 'first-input', buffered: true });






/**
 * DOM变动观察器（Mutation observer）
 * @link https://mp.weixin.qq.com/s/gQN374_qKdgQxpTiTdRVDA
 * @link https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver
 */
// 选择需要观察变动的节点
const targetNode = document.getElementById('mutation-id');

// 观察器的配置（需要观察什么变动）
const config = {
  childList: true, // node 的直接子节点的更改
  subtree: true, // node 的所有后代的更改
  attributes: true, // node 的特性（attribute)
  // attributeFilter: [], // 特性名称数组，只观察选定的特性。
  // attributeOldValue: true, // 如果为 true，则将特性的旧值和新值都传递给回调（参见下文），否则只传新值（需要 attributes 选项）
  // characterData: true, // 是否观察 node.data（文本内容）
  // characterDataOldValue: true, //如果为 true，则将 node.data 的旧值和新值都传递给回调（参见下文），否则只传新值（需要 characterData 选项）
};

// 当观察到变动时执行的回调函数
const callback = function (mutationsList, observer) {
  console.log('Mutation observer:', mutationsList, observer)
  // Use traditional 'for loops' for IE 11
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      console.log('A child node has been added or removed.');
    }
    else if (mutation.type === 'attributes') {
      console.log('The ' + mutation.attributeName + ' attribute was modified.');
    }
  }
};

// 创建一个观察器实例并传入回调函数
const observer1 = new MutationObserver(callback);

// 以上述配置开始观察目标节点
observer1.observe(targetNode, config);

targetNode.style.color = 'red';

// 之后，可停止观察
// observer1.disconnect();