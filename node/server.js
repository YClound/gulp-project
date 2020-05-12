const express = require('express');
const app = express();
const port = 9999;

// 强缓存
// const options = {
//   etag: false, // 禁止协商缓存
//   lastModified: false, // 禁止协商缓存
//   setHeaders: (res, path, stat) => {
//     res.set('Cache-Control', 'max-age=10');
//   }
// }

// 协商缓存 etag弱缓存
// const options = {
//   etag: true, // 开启协商缓存
//   lastModified: true, // 开启协商缓存
//   setHeaders: (res, path, stat) => {
//     res.set({
//       'Cache-Control': 'max-age=0',
//       'Pragma': 'no-cache'
//     })
//   }
// }

// 协商缓存 etag强缓存
const MD5 = require('md5');
const fs = require('fs');
const options = {
  etag: true, // 开启协商缓存
  lastModified: false, // 关闭另一种协商缓存
  setHeaders: (res, path, stat) => {
    const data = fs.readFileSync(path, 'utf-8').trim(); // 读取文件
    const hash = MD5((JSON.stringify(data))); // MD5加密
    console.log(data, hash)
    res.set({
      'Cache-Control': 'max-age=0',
      'Pragma': 'no-cache',
      'ETag': hash
    })
  }
}

app.use(express.static((__dirname + '/public'), options))

// Content-Type: application/json
app.use(express.json());

// Content-Type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// 文件上传 content-type: multipart/form-data
const multer = require('multer');
const upload = multer({ dest: 'upload/' });

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

// 文件上传
app.post('/api/upload', upload.single('file'), (req, res) => {
  console.log('req body', req.body);
  console.log('req file', req.file);
  if (req.file.fieldname) {
    res.send({
      code: 0,
      success: true,
      msg: '请求成功',
      data: {},
    })
  }
})

// get请求
app.get('/api/home', (req, res) => {
  console.log(req.query,'get')
  res.send({
    code: 0,
    success: true,
    msg: '请求成功',
    data: {
      type: 'get'
    },
  })
})

// post请求
app.post('/api/index', (req, res) => {
  console.log(req.body, 'post')
  res.send({
    code: 0,
    success: true,
    msg: '请求成功',
    data: {
      type: 'post'
    },
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})