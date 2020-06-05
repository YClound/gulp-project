# javascript基础

## 函数

## this指向

## apply、call、bind
> apply()把参数打包成Array再传入
> call()把参数按顺序传入

````javascript
Math.max.apply(null, [3, 5, 4]); // 5
Math.max.call(null, 3, 5, 4); // 5
````