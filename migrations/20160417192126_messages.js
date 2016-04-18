exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', function(table) {
    table.increments();
    table.string('name');
    table.text('message');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('messages');
};
