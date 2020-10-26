# 微信网页h5
## 自定义分享
> 20201023 [微信公众号开发文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html])  react + history 单页面应用
### 获取签名
1. 先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”；
2. 在需要调用JS接口的页面引入如下JS文件，（支持https）：http://res.wx.qq.com/open/js/jweixin-1.6.0.js；
3. 后端交互获取微信签名，签名生成规则如下：参与签名的字段包括noncestr（随机字符串）, 有效的jsapi_ticket, timestamp（时间戳）, url（当前网页的URL，不包含#及其后面部分） 。对所有待签名参数按照字段名的ASCII 码从小到大排序（字典序）后，使用URL键值对的格式（即key1=value1&key2=value2…）拼接成字符串string1。这里需要注意的是所有参数名均为小写字符。对string1作sha1加密，字段名和字段值都采用原始值，不进行URL 转义；
````html
// template文件的html中获取初始访问页面链接
<script>
  window.shareUrl = location.href;
</script>
````
````javascript
// 安卓手机获取当前链接
let url = location.href.split('#')[0];
// IOS端 使用默认首次进来的链接
if (navigator.userAgent.indexOf('iPhone') !== -1) {
  url = window.shareUrl.split('#')[0];
}
````
4. 通过config接口注入权限验证配置
````javascript
// 接口返回配置
wx.config({
  debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  appId: '', // 必填，公众号的唯一标识
  timestamp: , // 必填，生成签名的时间戳
  nonceStr: '', // 必填，生成签名的随机串
  signature: '',// 必填，签名
  jsApiList: [] // 必填，需要使用的JS接口列表
});
````

### 注意点
> 微信开发工具你可以辅助开发，真实的分享流程需要在手机上面进行测试
##### IOS手机使用history.push跳转页面 
* 使用当前页面url去获取验签失败 安卓手机正常；使用location跳转页面，安卓、IOS验签正常
* IOS 使用首次进来的页面地址去验签，验签成功

##### 安卓手机
* 使用当前页面url验签

### PC调试工具
> 【微信开发工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

### mobile端调试工具
1. charles开启代理
2. host 进行域名映射
3. 手机开启 proxy
