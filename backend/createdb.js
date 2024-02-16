const knex = require("knex")({
  client: "postgresql",
  connection: {
    user: "postgres",
    password: "1234",
  },
});


async function createDatabase(databaseName) {
  try {
    await knex.raw(`CREATE DATABASE ${databaseName}`);
    console.log(`Database '${databaseName}' created successfully.`);
  } catch (error) {
    console.error(`Error creating database '${databaseName}':`, error.message);
  } finally {
    await knex.destroy();
  }
}

createDatabase("richpanel");
