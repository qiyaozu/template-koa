# koa-server

## 功能1：邮件服务通知：
1. 配置邮件在config.js，该有的注意事项都在里面
2. 在开发环境中不提示，控制台打印错误，`npm run start`的时候才会发送邮件


## 功能2：错误统计：
1. sentry配置起来相对麻烦一点点，就自己搞了个统计的小功能，是否开启此功能在`config.js`
2. 统计出错时间、user-agent(以后可以分析是在什么平台，什么浏览器)、错误的详细位置、错误类型（便于以后分析每个错出现了几次）

## 功能3：api文档生成：
1. 使用`npm run doc`,便可生成html文档，默认是在docs目录下，也可自行更改`gulpfile.js`
2. apidoc的相关使用：http://apidocjs.com
3. api文档配置在controllers -> apidoc.json,
4. api文档生成demo示例：controllers -> goods.js

### 数据库配置在db.js里面

### 图片上传目录是upload目录

### 注：项目启动需要启动redis