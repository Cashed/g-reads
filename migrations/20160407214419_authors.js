exports.up = function(knex, Promise) {
  return knex.schema.createTable('authors', function(table) {
    table.increments();
    table.string('first');
    table.string('last');
    table.text('bio');
    table.string('url');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('authors');
};
