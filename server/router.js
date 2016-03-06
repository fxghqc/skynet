import Router from 'koa-router'
import r from 'rethinkdb'
import KoaBody from 'koa-body'
import serverConfig from './config'

// let { ['rethinkdb'] : config, ['table'] : robotTable } = serverConfig
let config = serverConfig.rethinkdb
let robotTable = serverConfig.table

let router = new Router({
  prefix: '/api/v1'
})
let koaBody = new KoaBody({ multipart: true })

let connection = null;

r.connect(config).then((conn) => {
  connection = conn
})

router
  .get('/', (ctx, next) => {
    ctx.body = { message: 'Hello World!' }
  })
  .get('/robots', (ctx) => {
    // r.table(robotTable).run(connection).then(function(cursor) {
    //   return cursor.toArray();
    // }).then(function(result) {
    //   res.send(JSON.stringify(result));
    // }).error(handleError(res))
    // .finally(next);
    return r.table(robotTable).run(connection).then((cursor) => {
      return cursor.toArray()
    }).then((result) => ctx.body = result)
  })
  .post('/robots', koaBody, (ctx) => {
    let newLang = ctx.request.body
    let promise = r.table(robotTable).insert(newLang, {returnChanges: true}).run(connection).then((result) => {
      ctx.body = result.changes[0].new_val
    })
    return promise
  })
  .get('/robots/:id', (ctx) => {
    var id = ctx.params.id
    var promise = r.table(robotTable).get(id).run(connection).then((result) => {
      ctx.body = result
    })
    return promise
  })
  .put('/robots/:id', koaBody, (ctx) => {
    var lang = ctx.request.body;
    var id = ctx.params.id;
    var promise = r.table(robotTable).get(id).update(lang, {returnChanges: true}).run(connection).then((result) => {
      if (result.unchanged === 1) {
        ctx.body = lang;
      } else {
        ctx.body = result.changes[0].new_val;
      }
    })

    return promise
  })
  .del('/robots/:id', (ctx) => {
   let id = ctx.params.id;
   let promise = r.table(robotTable).get(id).delete().run(connection).then(() => {
     ctx.body = ''
   })
   return promise;
  })

export default router;
