const { v4: uuidv4 } = require("uuid");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  // await knex("Users").del();
  await knex("Users").insert([
    {
      UserID: "8430670b-c492-4c0d-8fa5-811ab4e52884",
      Name: "User111",
      PhoneNumber: "1111111111",
      EmailAddress: "user111@example.com",
      Password: "password111",
    },
    {
      UserID: "b9bae0b8-f270-4d13-8e50-f657c276373f",
      Name: "User222",
      PhoneNumber: "22222222222",
      EmailAddress: "user222@example.com",
      Password: "password222",
    },
    {
      UserID: "5079b555-5fd3-41b0-87ec-e00782f18617",
      Name: "User333",
      PhoneNumber: "3333333333",
      EmailAddress: "user333@example.com",
      Password: "password333",
    },
    {
      UserID: "02e40ae3-c299-4ddc-97c0-5aebca2e8aa2",
      Name: "User444",
      PhoneNumber: "444444444",
      EmailAddress: "user444@example.com",
      Password: "password444",
    },
    {
      UserID: "ca28abda-d908-4a5c-a38d-e136b214802c",
      Name: "User555",
      PhoneNumber: "5555555555",
      EmailAddress: "user555@example.com",
      Password: "password555",
    },
    {
      UserID: "415a1c03-e8bd-41c3-b7d2-bff838b2b088",
      Name: "User666",
      PhoneNumber: "6666666666",
      EmailAddress: "user666@example.com",
      Password: "password666",
    },
    
  ]);
};
