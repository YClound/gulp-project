# 发布npm模块

## 创建npm账号
* 账号密码yanan.g adore123789 758295651@qq.com

## 发布npm
* npm login
* npm publish|npm publish --access=public

## 更新npm包
* npm version <update_type>
* npm login
* npm publish

## 注意点
* npm包管理已有重命名的包（You do not have permission to publish "test-publish-npm）

## npm run script（npm 脚本）
* & 并行执行
* && 顺序执行
* process.env.npm_lifecycle_event(返回当前正在运行的脚本名称)
* npm_package_前缀（使用package.json内部变量）
### 预定义脚本：
### 自定义脚本：

## 环境变量跨平台设置
* cross-env

## npm包版本号
* 精确版本： 例如1.0.0
* 锁定主板版和次版本： 可以写成 1.0、1.0.x 或 ~1.0.0（ npm install 默认采用的形式）
* 仅锁定主版本：可以写成 1、1.x 或 1^1.0.0
* 最新版本： *或x

## package-lock.json
* 锁定全部直接依赖和间接依赖的精确版本号，或者说提供了关于 node_modules 目录的精确描述，从而确保在这个项目中开发的所有人都能有完全一致的 npm 依赖。

## 常用的npm库
### node库
|名称|说明|
|--|--|
|commander|完整的 node.js 命令行解决方案|
|chalk|Terminal string styling done right|
|inquirer|A collection of common interactive command line user interfaces.|

### javascript库
|名称|说明|
|--|--|
|ismobilejs|A simple JS library that detects mobile devices in both the browser and NodeJS|

### react库
|名称|说明|
|--|--|
|react-beautiful-dnd|Beautiful and accessible drag and drop for lists with React|