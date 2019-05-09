exports.up = function (knex) {
  return knex.schema.createTable('messages', messages => {

    messages.increments();

    messages
      .text('message')
      .notNullable()
      .unique();

  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('messages');
};
