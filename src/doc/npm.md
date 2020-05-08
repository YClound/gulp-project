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

## 环境变量跨平台设置
* cross-env