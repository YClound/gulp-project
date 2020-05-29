"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Axios = require('axios');
const serverUrl = 'http://localhost:9999';
exports.request = (options) => {
    let { url, method = "GET", headers = { "Content-Type": "application/x-www-form-urlencoded" }, data } = options;
    let params = { params: data };
    if (!url) {
        throw new Error('request url not empty');
    }
    if (!method) {
        throw new Error('request method not empty');
    }
    if (headers["Content-Type"] === 'application/json') {
        data = JSON.stringify(data);
    }
    if (method === 'post') {
        params = { data };
    }
    return Axios(Object.assign({ method, url: `${serverUrl}/api${url}`, headers }, params)).then((res = {}) => {
        const respData = res.data || {};
        if (respData.code === 0) {
            return respData.data;
        }
    });
};
//# sourceMappingURL=request.js.map