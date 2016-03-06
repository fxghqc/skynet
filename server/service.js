import r from 'rethinkdb'
// import { rethinkdb as config, table as robotTable } from './config'
import serverConfig from './config'

// let { ['rethinkdb'] : config, ['table'] : robotTable } = serverConfig
let config = serverConfig.rethinkdb
let robotTable = serverConfig.table

function init () {
  r.connect(config).then((conn) => {
    r.table(robotTable).run(conn).then((result) => {
      console.log('Table is available.')
    }, () => {
      console.log('The database/table was not available, create them.')

      r.dbCreate(config.db).run(conn).then(
        () => r.tableCreate(robotTable).run(conn),
        (err) => {
          if (err.msg.indexOf('already exists') >= 0) {
            console.log('The database already exists, create table.')
            return r.tableCreate(robotTable).run(conn)
          } else {
            console.log(err)
            return
          }
      }).then(
        (result) => {
          console.log('Table is available...')

          let robots = []
          for (let i = 0; i < 100; i++ ) {
            robots.push({ name: 'robot-' + i, type: i % 10 })
          }

          r.table(robotTable).insert(robots).run(conn).then((result) => {
            if (result.inserted !== 100) {
              console.log('Document was not inserted.');
              console.log(result)
            } else {
              console.log('Document created.');
            }
          }).error((err) => console.log(err)).finally(() => {
            conn.close()
          })
        },
        () => console.log('Table created failed.')
      )
    })
  }, (err) => {
    console.log('Could not open a connection to initialize the database')
    console.log(err.message)
  })
}

function createConnection () {
  // r.connect(config.rethinkdb).then(function(conn) {
  //     req._rdbConn = conn;
  //     next();
  // }).error(handleError(res));
}

function closeConnection () {
  // req._rdbConn.close();
}

export default init
