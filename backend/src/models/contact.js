// models/Contact.js
const { Model } = require('objection');
const Knex = require('knex');

const knexConfig = require('../../knexfile').development; // Adjust the path accordingly

const knex = Knex(knexConfig);
Model.knex(knex);

class Contact extends Model {
  static get tableName() {
    return 'Contacts';
  }

  static get idColumn() {
    return 'ContactID'; // Make sure this matches your actual primary key column
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['ContactName', 'ContactPhoneNumber'],
      properties: {
        ContactID: { type: 'integer' },
        UserID: { type: 'integer' },
        ContactName: { type: 'string', minLength: 1, maxLength: 255 },
        ContactPhoneNumber: { type: 'string', minLength: 1, maxLength: 15 },
        SpamCount: { type: 'integer', default: 0 },
      },
    };
  }
}

module.exports = Contact;
