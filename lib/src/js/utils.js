"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThousandNum = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const money = exports.ThousandNum(1000.02);
exports.RandomId = len => Math.random().toString(36).substr(3, len);
const id = exports.RandomId(5);
exports.locationParams = new URLSearchParams(location.search.replace(/\?/ig, ""));
exports.RandomColor = () => "#" + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0");
exports.arrayRepeat = (arr) => [...new Set(arr)];
exports.mixArray = (arr) => arr.slice().sort(() => Math.random() - .5);
exports.count = arr.reduce((t, v) => {
    t[v] = t[v] ? ++t[v] : 1;
    return t;
}, {});
exports.AutoResponse = (width = 750) => {
    const target = document.documentElement;
    target.clientWidth >= 600
        ? (target.style.fontSize = "80px")
        : (target.style.fontSize = target.clientWidth / width * 100 + "px");
};
//# sourceMappingURL=utils.js.map