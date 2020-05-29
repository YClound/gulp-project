"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataType = function (data, type) {
    const dataType = Object.prototype.toString.call(data).replace(/\[object (\w+)\]/, "$1").toLowerCase();
    return type ? dataType === type : dataType;
};
exports.isArrayEmpty = (arr) => { return Array.isArray(arr) && !arr.length; };
exports.isObjectEmpty = (obj) => { return exports.getDataType(obj, 'object') && !Object.keys(obj).length; };
//# sourceMappingURL=type.js.map