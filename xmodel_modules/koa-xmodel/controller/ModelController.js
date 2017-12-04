const log = require('tracer').colorConsole()
/**
 * [ModelController 实体控制器，接收路由入参，对实体进行数据库操作]
 * 默认MODEL文件夹路径位于{PROJECT}/src/model/
 * @type {Object}
 */
let ModelController = {
    /**
     * [create 直接插入JSON对象]
     * @param  {[type]} ctx [description]
     * @return {[type]}     [description]
     */
    create: function (ctx) {
        let Model = ctx.request.Model
        let model = ctx.request.body
        return new Promise((resolve, reject) =>
            Model.create(model).then(function (result) {
                model.id = result.id
                resolve(model)
            }).catch(function (err) {
                log.error(err.message)
                reject(err.message)
            })
        )
    },
    /**
     * [update 通过ID更新JSON对象]
     * @param  {[type]} ctx [description]
     * @return {[type]}     [description]
     */
    update: function (ctx) {
        let Model = ctx.request.Model
        let model = ctx.request.body
        let where = { where: { id: model.id } }
        return new Promise((resolve, reject) =>
            Model.update(model, where).then(function (result) {
                resolve(result)
            }).catch(function (err) {
                log.error(err.message)
                reject(err.message)
            })
        )
    },
    /**
     * [query 通过JSON对象作为条件查询]
     * @param  {[type]} ctx [description]
     * @return {[type]}     [description]
     */
    query: function (ctx) {
        let Model = ctx.request.Model
        let where = { where: ctx.request.body }
        return new Promise((resolve, reject) =>
            Model.findAll(where).then(function (result) {
                resolve(result)
            }).catch(function (err) {
                log.error(err.message)
                reject(err.message)
            })
        )
    },
    /**
     * [get 通过ID作为条件查询]
     * @param  {[type]} ctx [description]
     * @return {[type]}     [description]
     */
    get: function (ctx) {
        let Model = ctx.request.Model
        let where = { where: { id: ctx.params.id } }
        return new Promise((resolve, reject) =>
            Model.findOne(where).then(function (result) {
                resolve(result)
            }).catch(function (err) {
                log.error(err.message)
                reject(err.message)
            })
        )
    },
    /**
     * [destroy 通过ID作为条件删除]
     * @param  {[type]} ctx [description]
     * @return {[type]}     [description]
     */
    destroy: function (ctx) {
        let Model = ctx.request.Model
        let where = { where: { id: ctx.params.id } }
        return new Promise((resolve, reject) =>
            Model.destroy(where).then(function (result) {
                resolve(result)
            }).catch(function (err) {
                log.error(err.message)
                reject(err.message)
            })
        )
    }
}

module.exports = ModelController
