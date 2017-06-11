// 路由相关
const Router = require('koa-router')
// 初始化路由
const router = new Router()
// 控制器加载
const CONTROLLER_PATH = __dirname + '/controller/ModelController.js'
const MODEL_SUFFIX = '.js'
const fs = require('fs')
// 日志
const log = require('tracer').colorConsole()

/**
 * 同步所有实体和数据库
 */
router.initConnect = function (modelDir,sequelize) {
    router.modelDir = modelDir
    fs.readdirSync(modelDir).forEach(function (filename) {
        require(modelDir + filename)
    })
    sequelize.sync().then(function () {
        log.info('xmodel所有实体已同步数据库')
    })
}

// 配置路由与Controller方法的绑定
/**
 * 创建实体对象
 */
router.post('/:model_name/create', async function (ctx, next) {
    // 从请求路径中获取Controller名称
    ctx.request.modelName = transJavaStyle(ucfirst(ctx.params.model_name)) + MODEL_SUFFIX
    // 动态加载对应名称的方法
    let model = require(CONTROLLER_PATH)
    if (router.modelDir) {
        model.modelDir = router.modelDir
    }
    let result = await model.create(ctx)
    ctx.body = result
})

/**
 * 更新实体对象
 */
router.post('/:model_name/update', async function (ctx, next) {
    // 从请求路径中获取Controller名称
    ctx.request.modelName = transJavaStyle(ucfirst(ctx.params.model_name)) + MODEL_SUFFIX
    // 动态加载对应名称的方法
    let model = require(CONTROLLER_PATH)
    if (router.modelDir) {
        model.modelDir = router.modelDir
    }
    let result = await model.update(ctx)
    ctx.body = result
})
/**
 * 复杂查询实体对象
 */
router.post('/:model_name/query', async function (ctx, next) {
    // 从请求路径中获取Controller名称
    ctx.request.modelName = transJavaStyle(ucfirst(ctx.params.model_name)) + MODEL_SUFFIX
    // 动态加载对应名称的方法
    let model = require(CONTROLLER_PATH)
    if (router.modelDir) {
        model.modelDir = router.modelDir
    }
    let result = await model.query(ctx)
    ctx.body = result
})
/**
 * 销毁实体对象
 */
router.get('/:model_name/destroy/:id', async function (ctx, next) {
    // 从请求路径中获取Controller名称
    ctx.request.modelName = transJavaStyle(ucfirst(ctx.params.model_name)) + MODEL_SUFFIX
    // 动态加载对应名称的方法
    let model = require(CONTROLLER_PATH)
    if (router.modelDir) {
        model.modelDir = router.modelDir
    }
    let result = await model.destroy(ctx)
    ctx.body = result
})
/**
 * 获取实体对象
 */
router.get('/:model_name/get/:id', async function (ctx, next) {
    // 从请求路径中获取Controller名称
    ctx.request.modelName = transJavaStyle(ucfirst(ctx.params.model_name)) + MODEL_SUFFIX
    // 动态加载对应名称的方法
    let model = require(CONTROLLER_PATH)
    if (router.modelDir) {
        model.modelDir = router.modelDir
    }
    let result = await model.get(ctx)
    ctx.body = result
})

function ucfirst(str) {
    str = str.toLowerCase()
    str = str.replace(/\b\w+\b/g, function (word) {
        return word.substring(0, 1).toUpperCase() + word.substring(1)
    })
    return str
}

function transJavaStyle(str) {
    let re = /_(\w)/g
    return str.replace(re, function ($0, $1) {
        return $1.toUpperCase()
    })
}

module.exports = router
