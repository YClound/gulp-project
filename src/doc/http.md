# HTTP
## HTTP缓存机制
![图片](../images/http-cache.webp)
### Expires
> Expires 的值是一个 HTTP 日期，在浏览器发起请求时，会根据系统时间和 Expires 的值进行比较，如果系统时间超过了 Expires 的值，缓存失效
### Cache-Control
> Cache-Control 是 HTTP/1.1 中新增的属性，在请求头和响应头中都可以使用，常用的属性值如有：
* max-age：单位是秒，缓存时间计算的方式是距离发起的时间的秒数，超过间隔的秒数缓存失效
* no-cache：不使用强缓存，需要与服务器验证缓存是否新鲜
* no-store：禁止使用缓存（包括协商缓存），每次都向服务器请求最新的资源
* private：专用于个人的缓存，中间代理、CDN 等不能缓存此响应
* public：响应可以被中间代理、CDN 等缓存
* must-revalidate：在缓存过期前可以使用，过期后必须向服务器验证
### Pragma
> Pragma 只有一个属性值，就是 no-cache ，效果和 Cache-Control 中的 no-cache 一致，不使用强缓存，需要与服务器验证缓存是否新鲜，在 3 个头部属性中的优先级最高。

### 强缓存
* 第一次加载，页面会向服务器请求数据，并在 Response Header 中添加 Cache-Control ，过期时间为 10 秒。
* 第二次加载，Date 头属性未更新，可以看到浏览器直接使用了强缓存，实际没有发送请求。
````
const express = require('express');
const app = express();
var options = { 
  etag: false, // 禁用协商缓存
  lastModified: false, // 禁用协商缓存
  setHeaders: (res, path, stat) => {
    res.set('Cache-Control', 'max-age=10'); // 强缓存超时时间为10秒
  },
};
app.use(express.static((__dirname + '/public'), options));
app.listen(3000);
````

### 协商缓存
#### ETag/If-None-Match
> ETag/If-None-Match 的值是一串 hash 码，代表的是一个资源的标识符，当服务端的文件变化的时候，它的 hash码会随之改变，通过请求头中的 If-None-Match 和当前文件的 hash 值进行比较，如果相等则表示命中协商缓存。ETag 又有强弱校验之分，如果 hash 码是以 "W/" 开头的一串字符串，说明此时协商缓存的校验是弱校验的，只有服务器上的文件差异（根据 ETag 计算方式来决定）达到能够触发 hash 值后缀变化的时候，才会真正地请求资源，否则返回 304 并加载浏览器缓存。

#### Last-Modified/If-Modified-Since
> Last-Modified/If-Modified-Since 的值代表的是文件的最后修改时间，第一次请求服务端会把资源的最后修改时间放到 Last-Modified 响应头中，第二次发起请求的时候，请求头会带上上一次响应头中的 Last-Modified 的时间，并放到 If-Modified-Since 请求头属性中，服务端根据文件最后一次修改时间和 If-Modified-Since 的值进行比较，如果相等，返回 304 ，并加载浏览器缓存。

##### 文件修改重新加载文件
````
const express = require('express');
const app = express();
var options = { 
  etag: true, // 开启协商缓存
  lastModified: true, // 开启协商缓存
  setHeaders: (res, path, stat) => {
    res.set({
      'Cache-Control': 'max-age=00', // 浏览器不走强缓存
      'Pragma': 'no-cache', // 浏览器不走强缓存
    });
  },
};
app.use(express.static((__dirname + '/public'), options));
app.listen(3001);
````
#### ETag/If-None-Match
> 解决了 Last-Modified/If-Modified-Since 所解决不了的问题
* 如果文件的修改频率在秒级以下，Last-Modified/If-Modified-Since 会错误地返回 304
* 如果文件被修改了，但是内容没有任何变化的时候，Last-Modified/If-Modified-Since 会错误地返回 304，上面的例子就说明了这个问题
````
const express = require('express');
const CryptoJS = require('crypto-js/crypto-js');
const fs = require('fs');
const app = express();
var options = { 
  etag: true, // 只通过Etag来判断
  lastModified: false, // 关闭另一种协商缓存
  setHeaders: (res, path, stat) => {
    const data = fs.readFileSync(path, 'utf-8'); // 读取文件
    const hash = CryptoJS.MD5((JSON.stringify(data))); // MD5加密
    res.set({
      'Cache-Control': 'max-age=00', // 浏览器不走强缓存
      'Pragma': 'no-cache', // 浏览器不走强缓存
      'ETag': hash, // 手动设置Etag值为MD5加密后的hash值
    });
  },
};
app.use(express.static((__dirname + '/public'), options));
app.listen(4000); // 使用新端口号，否则上面验证的协商缓存会一直存在
````