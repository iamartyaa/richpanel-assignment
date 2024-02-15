/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  // await knex("SpamNumbers").del();
  await knex("SpamNumbers").insert([
    {
      PhoneNumber: "1234567890",
      ReporterUserID: "8430670b-c492-4c0d-8fa5-811ab4e52884", // Replace with an existing User ID
    },
    {
      PhoneNumber: "4444567890",
      ReporterUserID: "02e40ae3-c299-4ddc-97c0-5aebca2e8aa2", // Replace with an existing User ID
    },
    {
      PhoneNumber: "5554567890",
      ReporterUserID: "415a1c03-e8bd-41c3-b7d2-bff838b2b088", // Replace with an existing User ID
    },
    {
      PhoneNumber: "1234567890",
      ReporterUserID: "02e40ae3-c299-4ddc-97c0-5aebca2e8aa2", // Replace with an existing User ID
    },
  ]);
};
