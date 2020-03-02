// 类型判断

/**
 * 判断数据类型
 * 可判断类型：undefined、null、string、number、boolean、array、object、symbol、date、regexp、function、asyncfunction、arguments、set、map、weakset、weakmap
 */
export const getDataType = function (data, type) {
  const dataType = Object.prototype.toString.call(data).replace(/\[object (\w+)\]/, "$1").toLowerCase();
  return type ? dataType === type : dataType;
}

/**
 * 是否为空数组
 */
export const isArrayEmpty = (arr) => { return Array.isArray(arr) && !arr.length }

/**
 * 是否为空对象
 */
export const isObjectEmpty = (obj) => { return getDataType(obj, 'object') && !Object.keys(obj).length }
