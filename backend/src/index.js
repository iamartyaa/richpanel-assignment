const express = require("express");
const bcrypt = require('bcrypt');
const bodyParser = require("body-parser");
const User = require("./models/user.js");
const SpamNumber = require("./models/spamNumber.js");
const Contact = require("./models/contact.js");

const jwt = require('jsonwebtoken');
const secretKey = 'himanshu123';

const app = express();
app.use(bodyParser.json());
const saltRounds = 10; // Number of salt rounds for bcrypt


app.get("/", (req, res) => {
  res.send("Hello, This is Instahyre coding task");
});


function verifyToken(req, res, next) {
  const rawtoken = req.headers.authorization;

  if (!rawtoken) {
    return res.status(401).json({ error: 'Unauthorized: Token missing' });
  }

  console.log('Decoded user:', rawtoken);
  const [bearer, token] = rawtoken.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Unauthorized: Invalid authorization format' });
  }


  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Unauthorized: Invalid token' });
    }

    req.user = user; // Attach the user object to the request
    next();
  });
}



// Register endpoint
app.post("/register", async (req, res) => {
  try {
    const { Name, PhoneNumber, EmailAddress, Password } = req.body;

    // Check if user with the provided phone number already exists
    const existingUser = await User.query().where({ PhoneNumber }).first();

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this phone number already registered" });
    }

    const hashedPassword = await bcrypt.hash(Password, saltRounds);

    const newUser = await User.query().insertAndFetch({
      Name,
      PhoneNumber,
      EmailAddress,
      Password: hashedPassword,
    });

     const token = jwt.sign({ userId: newUser.id, username: newUser.Name }, secretKey, { expiresIn: '1h' });

    delete newUser.Password
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



// Sign-in route
app.post("/signin", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);

  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const token = jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '1h' });

  res.json({ token });
});


// Mark number as spam endpoint
app.post("/markspam", verifyToken, async (req, res) => {
  try {
    const { PhoneNumber, ReporterUserID } = req.body;

    // Check if the phone number is in the Contacts table
    const contactEntry = await Contact.query()
      .where({ ContactPhoneNumber: PhoneNumber })
      .first();
    if (contactEntry) {
      await Contact.query()
        .where({ ContactPhoneNumber: PhoneNumber })
        .increment("SpamCount", 1);
    }

    await SpamNumber.query().insert({
      PhoneNumber,
      ReporterUserID: "8430670b-c492-4c0d-8fa5-811ab4e52884",
      //   ReporterUserID,
    });

    res.status(200).json({ success: "SUCCESS, marked number as spam." });
  } catch (error) {
    console.error("Error marking number as spam:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Search endpoint
app.get("/search", verifyToken,  async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }

    // Search people whose names start with the search query in Users table
    const userStartsWithResults = await User.query()
      .where("Name", "ilike", `${query}%`)
      .select("Name", "PhoneNumber")
      .orderBy("Name", "asc");

    // Search people whose names contain but don’t start with the search query in Users table
    const userContainsResults = await User.query()
      .where("Name", "ilike", `%${query}%`)
      .andWhereNot("Name", "ilike", `${query}%`)
      .select("Name", "PhoneNumber")
      .orderBy("Name", "asc");

    // Search phone numbers in Contacts table starting with the search query
    const contactStartsWithResults = await Contact.query()
      .where("ContactName", "ilike", `${query}%`)
      .select(
        "ContactName as Name",
        "ContactPhoneNumber as PhoneNumber",
        "SpamCount as spam_likelihood"
      )
      .orderBy("ContactName", "asc");

    // Search phone numbers in Contacts table
    const contactContainsResults = await Contact.query()
      .where("ContactName", "ilike", `%${query}%`)
      .andWhereNot("ContactName", "ilike", `${query}%`)
      .select(
        "ContactName as Name",
        "ContactPhoneNumber as PhoneNumber",
        "SpamCount as spam_likelihood"
      )
      .orderBy("ContactName", "asc");

    const allResults = [
      ...userStartsWithResults,
      ...userContainsResults,
      ...contactStartsWithResults,
      ...contactContainsResults,
    ];

    // Check spam likelihood for each phone number
    const resultsWithSpam = await Promise.all(
      allResults.map(async (result) => {
        const { PhoneNumber } = result;

        const spamEntry = await SpamNumber.query()
          .where({ PhoneNumber })
          .first();

        if (spamEntry) {
          if (!result.spam_likelihood) result.spam_likelihood = 0;
          result.spam_likelihood += 1;
        } else result.spam_likelihood = "none";

        return result;
      })
    );

    // Sort results by name
    const sortedResults = resultsWithSpam.sort((a, b) =>
      a.Name.localeCompare(b.Name, "en", { sensitivity: "base" })
    );

    res.status(200).json(sortedResults);
  } catch (error) {
    console.error("Error searching for users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Phone number search endpoint
app.get("/searchbyphone", verifyToken,  async (req, res) => {
  try {
    const { phoneNumber } = req.query;

    if (!phoneNumber) {
      return res.status(400).json({ error: "Phone number is required" });
    }

    // Search for a registered user
    const registeredUser = await User.query()
      .where("PhoneNumber", "ilike", phoneNumber)
      .select("Name", "PhoneNumber")
      .first();

    if (registeredUser) {
      const uniqueIdentifier = `${registeredUser.Name}-${registeredUser.PhoneNumber}`;
      // const spamEntry = await SpamNumber.query().where({ PhoneNumber: registeredUser.PhoneNumber }).first();
      // if (spamEntry) {
      //   registeredUser.SpamCount += 1;
      // }
      return res.status(200).json([registeredUser]);
    }

    // If no registered user found, search contacts
    const allResults = await Contact.query()
      .where("ContactPhoneNumber", "ilike", phoneNumber)
      .select("ContactName", "ContactPhoneNumber");


    // Check spam likelihood for each phone number
    const resultsWithSpam = await Promise.all(
      allResults.map(async (result) => {
        const { ContactPhoneNumber } = result;

        const contactEntry = await Contact.query()
          .where({ ContactPhoneNumber })
          .first();

        if (contactEntry && contactEntry.SpamCount !== null) {
          result.SpamCount =
            contactEntry.SpamCount > 0 ? contactEntry.SpamCount : "none";
        } else {
        }

        return result;
      })
    );


    if (allResults.length === 0) {
      const spamEntries = await SpamNumber.query().where({
        PhoneNumber: phoneNumber,
      });
      const totalSpamCount = spamEntries.length;
      const SpamCount = totalSpamCount > 0 ? totalSpamCount : "none";
      const result = {msg:"this number was not found anywhere but still is marked spam", phoneNumber, SpamCount}
      return res.status(200).json(result)
    }

    // Sort results by name
    const sortedResults = resultsWithSpam.sort((a, b) =>
      a.Name.localeCompare(b.Name, "en", { sensitivity: "base" })
    );

    res.status(200).json(sortedResults);
  } catch (error) {
    console.error("Error searching for users by phone number:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



// Start the server
const port = 3000; 
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
