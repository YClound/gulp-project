# 文件上传
> https://mp.weixin.qq.com/s/sHqN9sf8iOLzKApH0KR9vg
## 一. content-type类型

### 1. multipart/form-data
* 文件上传请求头

````
content-type: multipart/form-data, boundary=AaB03x;
````

* multipart/form-data规范

````
Content-type: multipart/form-data, boundary=AaB03x

--AaB03x

content-disposition: form-data; name="field1"
Joe Blow

--AaB03x

content-disposition: form-data; name="pics"; filename="file1.txt"
Content-Type: text/plain

... contents of file1.txt ...

--AaB03x--
````

## 2. Multer
> (node middleware for handle multipart/form-data)

## 3. application/x-www-form-urlencoded
* 不适合用于传输大型二进制数据或者包含非ASCII字符的数据；
* 表单数据使用url编码后传送给后端；

## 4. application/json
* 以文本形式进行传输；
* 某种意义上我们确实可以将文件转成例如文本形式的 Base64 形式。但是转成这样的形式，后端也需要按照你这样传输的形式，做特殊的解析。并且文本在传输过程中是相比二进制效率低的。