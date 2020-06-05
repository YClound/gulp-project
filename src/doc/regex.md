# [正则表达式](https://juejin.im/post/5e8ab4efe51d4547170a9233)

## JS中的正则表达式&&全面梳理｜内附思维导图
正则表达式，又称规则表达式。（英语：Regular Expression，在代码中常简写为regex、regexp或RE）
> 用来处理字符串的规则
> * 只能处理字符串
> * 它是一个规则：可以验证字符串是否符合某个规则（test），也可以把字符串中符合规则的内容捕获到（test(匹配) / exec(捕获) / match...）

````javascript
let str = "good good study , day day up！";
//=>学正则就是用来制定规则（是否包含数字）
let reg = /\d+/;
reg.test(str); //=>false

str = "2020-04-07";
reg.exec(str); //=>["2020",index:0,inputs:"原始字符串"]
````

## 正则基础（RegExp）
### 1、定义
>定义：是一种处理字符串的规则
> * JS中的正则 是一种引用数据类型
### 2、正则的编写方式
> 构造函数因为传递的是字符串，\需要写两个才代表斜杠
* 字面量方式：let reg = /\d+/g;
* 实例的方式：let reg = new RegExp("\\d+","g"); 当正则中的一些字符需要是变量的时候；才会选择这种方式
#### 两种方式的区别
* 正则表达式中的部分内容是变量存储的值时
````javascript
//1.两个斜杠中间包起来的都是元字符（如果正则中要包含某个变量的值，则不能使用字面量方式创建）
let type = "xiaozhima";
reg = /^@"+type+"@$/; 
console.log(reg.test("@xiaozhima@")); //=>false
console.log(reg.test('@"""typeeeee"@')); //=>true

//2.这种情况只能使用构造函数方式（因为它传递的规则是字符串，只有这样才能进行字符串拼接）
reg = new RegExp("^@"+type+"@$");
console.log(reg.test("@xiaozhima@"));//=>true
````