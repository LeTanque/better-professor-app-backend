exports.up = function (knex) {
  return knex.schema.createTable('projects', projects => {

    projects.increments();

    projects
      .string('project_name', 128)
      .notNullable();

    projects
      .datetime('project_deadline')
      .notNullable();

    projects
      .datetime('feedback_deadline')
      .notNullable();

    projects
      .datetime('recommendation_deadline')
      .notNullable();

  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('projects');
};