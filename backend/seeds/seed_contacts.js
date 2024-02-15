/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  // await knex("Contacts").del();
  await knex("Contacts").insert([
    {
      ContactName: "John Doe",
      ContactPhoneNumber: "1234567890",
      UserID: "8430670b-c492-4c0d-8fa5-811ab4e52884", // Make sure this matches an existing User ID
      SpamCount: 1,
    },
    {
      ContactName: "Rose",
      ContactPhoneNumber: "333567890",
      UserID: "b9bae0b8-f270-4d13-8e50-f657c276373f", // Make sure this matches an existing User ID
      SpamCount: 1,
    },
    {
      ContactName: "Marry",
      ContactPhoneNumber: "4444567890",
      UserID: "02e40ae3-c299-4ddc-97c0-5aebca2e8aa2", // Make sure this matches an existing User ID
      SpamCount: 1,
    },
    {
      ContactName: "John Wick",
      ContactPhoneNumber: "5554567890",
      UserID: "415a1c03-e8bd-41c3-b7d2-bff838b2b088", // Make sure this matches an existing User ID
      SpamCount: 2,
    },
    
  ]);
};
