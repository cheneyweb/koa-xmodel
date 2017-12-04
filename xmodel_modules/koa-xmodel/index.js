// 路由相关
const Router = require('koa-router')
// 初始化路由
const router = new Router()
// 控制器加载
const fs = require('fs')
const modelController = require(__dirname + '/controller/ModelController.js')
// 日志
const log = require('tracer').colorConsole()

/**
 * 同步所有实体和数据库
 */
router.initConnect = function (modelDir, sequelize) {
    router.modelArr = []
    fs.readdirSync(modelDir).forEach(function (filename) {
        router.modelArr[filename.split('.')[0]] = require(modelDir + filename)
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
    try {
        // 动态获取Model
        ctx.request.Model = router.modelArr[ctx.params.model_name]
        if (ctx.request.Model) {
            let result = await modelController.create(ctx)
            ctx.body = okRes(result)
        } else {
            ctx.body = errRes(`${ctx.params.model_name}未定义，请检查:model_name是否与model文件名一致`)
        }
    } catch (error) {
        log.error(error)
        ctx.body = errRes('路由服务异常')
    }
})

/**
 * 更新实体对象
 */
router.post('/:model_name/update', async function (ctx, next) {
    try {
        // 动态获取Model
        ctx.request.Model = router.modelArr[ctx.params.model_name]
        if (ctx.request.Model) {
            let result = await modelController.update(ctx)
            ctx.body = okRes(result)
        } else {
            ctx.body = errRes(`${ctx.params.model_name}未定义，请检查:model_name是否与model文件名一致`)
        }
    } catch (error) {
        log.error(error)
        ctx.body = errRes('路由服务异常')
    }
})
/**
 * 复杂查询实体对象
 */
router.post('/:model_name/query', async function (ctx, next) {
    try {
        // 动态获取Model
        ctx.request.Model = router.modelArr[ctx.params.model_name]
        if (ctx.request.Model) {
            let result = await modelController.query(ctx)
            ctx.body = okRes(result)
        } else {
            ctx.body = errRes(`${ctx.params.model_name}未定义，请检查:model_name是否与model文件名一致`)
        }
    } catch (error) {
        log.error(error)
        ctx.body = errRes('路由服务异常')
    }
})
/**
 * 销毁实体对象
 */
router.get('/:model_name/destroy/:id', async function (ctx, next) {
    try {
        // 动态获取Model
        ctx.request.Model = router.modelArr[ctx.params.model_name]
        if (ctx.request.Model) {
            let result = await modelController.destroy(ctx)
            ctx.body = okRes(result)
        } else {
            ctx.body = errRes(`${ctx.params.model_name}未定义，请检查:model_name是否与model文件名一致`)
        }
    } catch (error) {
        log.error(error)
        ctx.body = errRes('路由服务异常')
    }
})
/**
 * 获取实体对象
 */
router.get('/:model_name/get/:id', async function (ctx, next) {
    try {
        // 动态获取Model
        ctx.request.Model = router.modelArr[ctx.params.model_name]
        if (ctx.request.Model) {
            let result = await modelController.get(ctx)
            ctx.body = okRes(result)
        } else {
            ctx.body = errRes(`${ctx.params.model_name}未定义，请检查:model_name是否与model文件名一致`)
        }
    } catch (error) {
        log.error(error)
        ctx.body = errRes('路由服务异常')
    }
})

function okRes(res) {
    return { err: false, res: res }
}
function errRes(res) {
    return { err: true, res: res }
}

// function ucfirst(str) {
//     str = str.toLowerCase()
//     str = str.replace(/\b\w+\b/g, function (word) {
//         return word.substring(0, 1).toUpperCase() + word.substring(1)
//     })
//     return str
// }

// function transJavaStyle(str) {
//     let re = /_(\w)/g
//     return str.replace(re, function ($0, $1) {
//         return $1.toUpperCase()
//     })
// }

module.exports = router
