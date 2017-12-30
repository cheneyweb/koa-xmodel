# koa-xmodel
极简风格的RESTful无后端框架，只需要写实体类，然后直接RESTful请求，全自动CRUD

[传送门：XServer官网文档](http://www.xserver.top)

快速上手
>
	1, config/default.js 中设置数据库连接，然后执行npm install

	2, node app.js

注意事项
>
	1, 启动 app.js 后，系统会自动加载 {project}/src/model/ 下所有的JS文件，并且与数据库同步，创建数据库表或更新字段

	2, 切换到生产环境需要执行命令 export NODE_ENV=production

单独使用x-model中间件(任意koa应用均可集成)
>
	1, npm install koa-xmodel

	2, let xmodel = require('koa-xmodel')

	3, xmodel.initConnect(modelDir, sequelize)

	4, app.use(mount(controllerRoot, xmodel.routes()))

	可选设置model文件夹路径，默认路径是 {project}/src/model/	

命名规则
>
	Model文件名需要以【首字母大写】的【驼峰法】命名，例如应该是UserInfo.js，而不是userInfo.hs或user_info.js

框架目录结构
>
	├── app.js
	├── config
	│   ├── default.json
	│   ├── develop.json
	│   └── production.json
	├── node_modules
	├── package.json
	├── src
	│   ├── model
	│   └── sequelize
	└── xmodel_modules
	    └── koa-xmodel

RESTful规则
>
	[POST]http://host:port/xmodel/MODEL/create
	[POST]http://host:port/xmodel/MODEL/update
	[POST]http://host:port/xmodel/MODEL/query
	[GET]http://host:port/xmodel/MODEL/get/:id
	[GET]http://host:port/xmodel/MODEL/destroy/:id

例子
>
	以一个用户模块为例，需要对用户进行增删改查:
	需要注意的是默认自动创建id,createdAt,updatedAt三个字段，无须人工处理
	[POST]http://localhost:port/xmodel/UserModel/create
		post body:{"username":"cheney","password":"123"}
	[POST]http://localhost:port/xmodel/UserModel/update
		post body:{id:1,"username":"cheney","password":"456"}
	[POST]http://localhost:port/xmodel/UserModel/query
		post body:{"username":"cheney","password":"123"}
	[GET]http://localhost:port/xmodel/UserModel/get/1
	[GET]http://localhost:port/xmodel/UserModel/destroy/1

帮助联系
>
	作者:cheneyxu
	邮箱:457299596@qq.com
	QQ:457299596

更新日志
>
	2017.04.29:无后端理念确认，1.0版本推出
	2017.05.08:xauth模块移入x-koa项目
	2017.06.11:重构数据库初始连接方式
	2017.12.03:升级精简所有依赖，减少中转提升性能
	2017.12.04:优化返回数据对象
	2017.12.12:更新koa-body