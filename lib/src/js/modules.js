"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { commonName, commonGithub } = require('./export1');
console.log('CommonJs规范:', commonName, commonGithub);
setTimeout(() => {
    console.log('异步CommonJs规范:', require('./export1').commonName);
}, 100);
const export_1 = require("./export");
console.log('ES Module:', export_1.name, export_1.github);
setTimeout(() => {
    Promise.resolve().then(() => require('./export')).then(({ name }) => {
        console.log('异步ES Module规范:', name);
    });
}, 100);
//# sourceMappingURL=modules.js.map