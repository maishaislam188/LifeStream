const dns = require('node:dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);

const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mongo URI
const uri = process.env.MONGO_URI || "mongodb+srv://lifestream_user:UfQoQegymC9Rha2n@lifestreamcluster.uf8bw9z.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  family: 4
});

async function run() {
  try {
    await client.connect();
    console.log("Hurrah! LifeStream Database connected successfully!");

    const db = client.db("LifeStream");
    const userCollection = db.collection("users");

    // =========================
    // SIGNUP API
    // =========================
    app.post('/signup', async (req, res) => {
      try {
        const user = req.body;

        // check if email exists
        const existingUser = await userCollection.findOne({ email: user.email });
        if (existingUser) {
          return res.status(400).send({ message: "Email already exists" });
        }

        const result = await userCollection.insertOne(user);

        res.status(201).send({
          success: true,
          message: "User registered successfully",
          result
        });

      } catch (err) {
        res.status(500).send({ success: false, message: err.message });
      }
    });

    // =========================
    // LOGIN API (ADDED)
    // =========================
    app.post('/login', async (req, res) => {
      try {
        const { email, password } = req.body;

        const user = await userCollection.findOne({ email });

        if (!user) {
          return res.status(400).send({ message: "User not found" });
        }

        // plain password check (since signup is not hashed)
        if (user.password !== password) {
          return res.status(400).send({ message: "Wrong password" });
        }

        res.send({
          message: "Login successful",
          user: {
            name: user.name,
            email: user.email,
            role: user.role
          }
        });

      } catch (err) {
        res.status(500).send({ message: err.message });
      }
    });

  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
}

run().catch(console.dir);

// =========================
// TEST ROUTE
// =========================
app.get('/', (req, res) => {
  res.send('LifeStream Server is running!');
});

// =========================
// START SERVER
// =========================
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});