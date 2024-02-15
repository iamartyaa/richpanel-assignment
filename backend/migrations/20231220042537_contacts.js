exports.up = function (knex) {
  return knex.schema.createTable("Contacts", function (table) {
    table.uuid("ContactID").primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid("UserID").unsigned().notNullable();
    table.string("ContactName", 255).notNullable();
    table.string("ContactPhoneNumber", 15).notNullable();
    table.integer("SpamCount").defaultTo(0);
    table.foreign("UserID").references("UserID").inTable("Users");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Contacts");
};
