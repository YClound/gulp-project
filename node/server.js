const express = require('express');
const XLSX = require('xlsx');
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

// 公共目录路径
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
  // res.header("Access-Control-Allow-Origin", "http://localhost:9090");
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
  console.log(req.query, 'get')
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

const titles = ['姓名', '年龄', '性别'];
const data = [
  { name: '陈小瓦', age: 18, sex: '男' },
  { name: '李飞', age: 33, sex: '男' },
  { name: '林妹妹', age: 22, sex: '女' },
  { name: '小明', age: 10, sex: '男' },
  { name: '小红', age: 9, sex: '男' },
  { name: '小军', age: 11, sex: '男' },
  { name: '小丽', age: 18, sex: '女' },
  { name: '甲', age: 45, sex: '男' },
  { name: '乙', age: 21, sex: '男' },
  { name: '丁', age: 55, sex: '女' },
  { name: '武丑', age: 100, sex: '男' },
  { name: '子牛', age: 101, sex: '男' },
  { name: '盐虎', age: 102, sex: '男' },
  { name: '峰儿', age: 26, sex: '男' },
  { name: '坤鸡', age: 22, sex: '男' },
];

/**
 * 获取excel文件流
 */
function sheetToBuffer(sheet, sheetName) {
  sheetName = sheetName || 'sheet1';
  let workbook = {
    SheetNames: [sheetName],
    Sheets: {}
  };
  workbook.Sheets[sheetName] = sheet;
  // 生成excel的配置项
  let wopts = {
    bookType: 'xlsx', // 要生成的文件类型
    type: 'buffer'
  };
  let wbout = XLSX.write(workbook, wopts);
  return wbout;
}

/**
 * node 导出excel文档流
 */
app.post('/api/export', (req, res) => {
  console.log('导出excel文档流', req.body)
  const { name } = req.body;
  const queryData = data.filter(p => p.name.includes(name));
  let result, mimeType, filename;

  if (queryData.length > 0) {

    const xlsData = [titles];
    for (const item of queryData) {
      let d = [item.name, item.age, item.sex];
      xlsData.push(d);
    }
    //json转excel
    let sheet = XLSX.utils.aoa_to_sheet(xlsData);

    //excel转node文件流
    result = sheetToBuffer(sheet);

    mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    filename = `attachment;filename=${encodeURIComponent('人员列表')}.xlsx`;
    res.set('responseType', 'blob');
  } else {
    result = { code: 101, success: false, msg: '无数据可导出' };
    mimeType = "application/json; charset=utf-8";
  }

  res.set('Content-Type', mimeType);
  if (filename) {
    res.set("Content-Disposition", filename)
  }

  res.send(result)
})

// node 中间件代理 同源策略是浏览器需要遵循的标准，而如果是服务器向服务器请求就无需遵循同源策略。
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})