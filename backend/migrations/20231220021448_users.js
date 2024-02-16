exports.up = function (knex) {
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"').then(() => {
    return knex.schema.createTable("Users", function (table) {
      table.uuid("UserID").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("Name", 255).notNullable();
      table.string("EmailAddress", 255);
      table.string("Password", 255).notNullable();
    });
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Users");
};
