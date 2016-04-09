exports.up = function(knex, Promise) {
  return knex.schema.createTable('books-authors', function(table) {
    table.increments();
    table.integer('book_id');
    table.integer('author_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('authors');
};
