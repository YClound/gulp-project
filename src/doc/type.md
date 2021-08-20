## 数据基本类型
* Number (数字)
* String (字符串)
* Boolean (布尔值)
* Symbol (符号)
* Object (对象)
    * Function (函数)
    * Array (数组)
    * Date (日期)
    * RegExp (正则表达式)
    * Math (数学对象)
* Null (空)
* Undefined (未定义)
* Error (错误类型)


## Number (数字)
* 双精度64位格式
````javascript
// 精度失真
0.1 + 0.2 = 0.30000000000000004;
````

#### 内置函数
* parseInt() - 将字符串转换为整型
* parseFloat() - 只应用于解析十进制数字
````javascript
parseInt("110", 2); // 6
parseInt("110", 8); // 72
parseInt("110", 2); // 272

parseFloat('11111.22wwww') // 11111.22
parseInt('11111.222wwww') // 11111

10.2 + abc // 

parseInt("hello", 10); // NaN
````
* isNaN() - 来判断一个变量是否为 NaN：
````javascript
NaN + 5; //NaN

isNaN(NaN); // true
````

* isFinite() 来判断一个变量是否是一个有穷数， 如果类型为Infinity(正无穷), -Infinity(负无穷) 或 NaN则返回false：
````javascript
1 / 0; //  Infinity
-1 / 0; // -Infinity

isFinite(1/0); // false 
isFinite(Infinity); // false 
isFinite(NaN); // false 
isFinite(-Infinity); // false 

isFinite(0); // true 
isFinite(2e64); // true 

isFinite("0"); // true,如果是纯数值类型的检测，则返回false：Number.isFinite("0");
````
