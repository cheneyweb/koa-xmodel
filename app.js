// 系统配置参数
const config = require('config')
const port = config.get('server').port
const controllerRoot = config.get('server').controllerRoot
// 应用服务相关
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const mount = require('koa-mount')
const xmodel = require(__dirname + '/xmodel_modules/koa-xmodel/index.js')
// 持久层相关
const fs = require('fs')
const sequelize = require(__dirname + '/src/sequelize/sequelize.js')
let modelDir = __dirname + config.get('server').modelDir
// 日志相关
const log = require('tracer').colorConsole({ level: config.get('log').level })

// 首先同步所有实体和数据库
fs.readdirSync(modelDir).forEach(function (filename) {
	require(modelDir + filename)
})
sequelize.sync().then(function () {
	log.info('xmodel所有实体已同步数据库')
})

// 初始化应用服务
const app = new Koa()
// 入参JSON解析
app.use(bodyParser())

// 引入koa-xmodel中间件
xmodel.modelDir = modelDir
app.use(mount(controllerRoot, xmodel.routes()))

// 启动应用服务
app.listen(port)

log.info(`XModel服务已启动,执行环境:${process.env.NODE_ENV},端口:${port}...`)
log.info(`[POST]http://host:${port}/xmodel/MODEL/create`)
log.info(`[POST]http://host:${port}/xmodel/MODEL/update`)
log.info(`[POST]http://host:${port}/xmodel/MODEL/query`)
log.info(`[GET]http://host:${port}/xmodel/MODEL/get/:id`)
log.info(`[GET]http://host:${port}/xmodel/MODEL/destroy/:id`)
