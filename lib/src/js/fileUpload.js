"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_js_1 = require("../public/request.js");
window.onload = function () {
    const fileBtn = document.getElementById('file');
    fileBtn.addEventListener('change', (file) => {
        const fd = new FormData();
        fd.append('file', fileBtn.files[0]);
        console.log(fileBtn.files[0], request_js_1.request);
        request_js_1.request({
            url: '/upload',
            method: 'post',
            data: fd,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(res => {
            console.log(res);
        });
    });
    const TestGet = document.getElementById('testGet');
    TestGet.addEventListener('click', () => {
        request_js_1.request({
            url: '/home',
            method: 'get',
            data: { type: 'get' }
        }).then((res) => {
            console.log(res, 'get');
        });
    });
    const TestPost = document.getElementById('testPost');
    TestPost.addEventListener('click', () => {
        request_js_1.request({
            url: '/index',
            method: 'post',
            headers: { "Content-Type": 'application/json' },
            data: { type: 'post', object: { name: '1111111' } }
        }).then((res) => {
            console.log(res, 'get');
        });
    });
};
//# sourceMappingURL=fileUpload.js.map