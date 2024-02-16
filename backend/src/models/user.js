// models/User.js
const { Model } = require('objection');
const Knex = require('knex');

const knexConfig = require('../../knexfile.js').development; // Adjust the path accordingly
const knex = Knex(knexConfig);
Model.knex(knex);

class User extends Model {
  static get tableName() {
    return 'Users';
  }

  static get idColumn() {
    return 'UserID'; // Make sure this matches your actual primary key column
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['Name', 'EmailAddress', 'Password'],
      properties: {
        UserID: { type: 'string', format: 'uuid' },
        Name: { type: 'string', minLength: 1, maxLength: 255 },
        EmailAddress: { type: 'string', maxLength: 255 },
        Password: { type: 'string', minLength: 1, maxLength: 255 },
      },
    };
  }
}
 
module.exports = User;




 