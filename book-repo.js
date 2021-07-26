const connectedKnex = require('./knex-connector')

function getAllBook() {
  return connectedKnex("books").select('*');
}

function addBook(bks) {
  return connectedKnex('books').insert(bks);
}

function updateBook(bks, id) {
  return connectedKnex("books").where('ID', id).update(bks)
}

function deleteBook(id) {
  return connectedKnex('books').where('ID', id).del()
}

module.exports = {
  getAllBook,
  addBook,
  updateBook,
  deleteBook
}