// 系统配置参数
const config = require('config')
const port = config.server.port
// 应用服务相关
const Koa = require('koa')
const bodyBody = require('koa-body')
const xmodel = require(__dirname + '/xmodel_modules/koa-xmodel/index.js')
// 持久层相关
const sequelize = require(__dirname + '/src/sequelize/sequelize.js')
// 日志相关
const log = require('tracer').colorConsole({ level: config.log.level })

// 初始化应用服务
const app = new Koa()
// 入参JSON解析
app.use(bodyBody())

// 加载koa-xmodel中间件
xmodel.init(app, sequelize, config.server) // 初始化mysql连接

// 启动应用服务
app.listen(port)

log.info(`XModel服务启动【执行环境:${process.env.NODE_ENV},端口:${port}】`)
log.info(`[POST]http://localhost:${port}/xmodel/MODEL/create`)
log.info(`[POST]http://localhost:${port}/xmodel/MODEL/update`)
log.info(`[POST]http://localhost:${port}/xmodel/MODEL/query`)
log.info(`[GET ]http://localhost:${port}/xmodel/MODEL/get/:id`)
log.info(`[GET ]http://localhost:${port}/xmodel/MODEL/destroy/:id`)