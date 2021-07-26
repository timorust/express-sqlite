const knex = require('knex');
// knex CONNECTOR
const connectedKnex = knex({
  client: 'sqlite3',
  connection: {
    filename: 'hw1.db'
  }
})

module.exports = connectedKnex;