exports.up = function (knex) {
  return knex.schema.createTable('students', students => {

    students.increments();

    students
      .string('firstname', 128)
      .notNullable();

    students
      .string('lastname', 128)
      .notNullable();

    students
      .string('email', 128)
      .notNullable();

  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('students');
};