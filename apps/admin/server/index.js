const bcrypt = require('bcryptjs');
const User = require('./models/User');

const dns = require('node:dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// ================================
// ✅ MIDDLEWARE
// ================================
app.use(cors());
app.use(express.json());

// ================================
// ✅ ROUTES (LOAD FIRST)
// ================================
const authRoutes = require('./routes/auth');
const donorRoutes = require('./routes/donors');
const adminRoutes = require('./routes/admin');
const requestRoutes = require('./routes/requests');

app.use('/api/auth', authRoutes);
app.use('/api/donors', donorRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/requests', requestRoutes);

// ================================
// ✅ TEST ROUTE
// ================================
app.get('/', (req, res) => {
  res.send('LifeStream Server is running!');
});

// ================================
// ✅ MONGODB CONNECTION
// ================================
const uri =
  process.env.MONGO_URI ||
  "mongodb+srv://lifestream_user:UfQoQegymC9Rha2n@lifestreamcluster.uf8bw9z.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(uri)
  .then(async () => {
    console.log("✅ Mongoose connected successfully!");

    // Create admin after DB connect
    await createAdmin();

    // Start server ONLY after DB connected
    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error.message);
  });

// ================================
// ✅ CREATE ADMIN FUNCTION
// ================================
const createAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ email: "admin@gmail.com" });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("12345678", 10);

      const admin = new User({
        name: "Admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        role: "admin",
      });

      await admin.save();
      console.log("✅ Admin created successfully!");
    } else {
      console.log("ℹ️ Admin already exists");
    }
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
  }
};