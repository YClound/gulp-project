# javascript基础

## 对象(Object)
### Object.prototype.hasOwnProperty()
> 返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）
### Object.freeze() 
> 冻结一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。freeze() 返回和传入的参数相同的对象。

## 函数

## this指向

## apply、call、bind
> apply()把参数打包成Array再传入
> call()把参数按顺序传入

````javascript
Math.max.apply(null, [3, 5, 4]); // 5
Math.max.call(null, 3, 5, 4); // 5
````