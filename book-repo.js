const connectedKnex = require('./knex-connector')

function getAllBook() {
  return connectedKnex('books').select('*');
}

function postBook() {
  return connectedKnex('books').insert(bk);
}

module.exports = {
  getAllBook,
  postBook
}