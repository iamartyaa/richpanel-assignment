exports.up = function (knex) {
  return knex.schema.createTable("SpamNumbers", function (table) {
    table.uuid("SpamID").primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string("PhoneNumber", 15).notNullable();
    table.uuid("ReporterUserID").unsigned();
    table.foreign("ReporterUserID").references("UserID").inTable("Users");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("SpamNumbers");
};
