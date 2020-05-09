const express = require('express');
const app = express();
const port = 9999;

// 文件上传 content-type: multipart/form-data
const multer = require('multer');
const upload = multer({ dest: 'upload/' });

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.post('/api/upload', upload.single('file'), (req, res) => {
  console.log('req body', req.body);
  console.log('req file', req.file);
  if (req.file.fieldname) {
    res.send({ status: 200, message: '444444444', res: {} })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})