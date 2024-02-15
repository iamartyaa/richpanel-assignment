// models/SpamNumber.js
const { Model } = require('objection');
const Knex = require('knex');

const knexConfig = require('../../knexfile').development; // Adjust the path accordingly

const knex = Knex(knexConfig);
Model.knex(knex);

class SpamNumber extends Model {
  static get tableName() {
    return 'SpamNumbers';
  }

  static get idColumn() {
    return 'SpamID'; // Make sure this matches your actual primary key column
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['PhoneNumber'],
      properties: {
        SpamID: { type: 'string', format: 'uuid' },
        PhoneNumber: { type: 'string', minLength: 1, maxLength: 15 },
        ReporterUserID: { type: 'string', format: 'uuid' },
      },
    };
  }

  static get relationMappings() {
    const User = require('./User');

    return {
      reporter: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'SpamNumbers.ReporterUserID',
          to: 'Users.UserID',
        },
      },
    };
  }
}

module.exports = SpamNumber;
