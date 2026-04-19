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
    const admins = [
      {
        name: "Maisha Islam",
        email: "maishaislam@gmail.com",
      },
      {
        name: "Tonu Sridey",
        email: "tonusridey@gmail.com",
      },
    ];

    const password = await bcrypt.hash("12345678", 10);

    for (const adminData of admins) {
      const existingAdmin = await User.findOne({
        email: adminData.email,
      });

      if (!existingAdmin) {
        const admin = new User({
          name: adminData.name,
          email: adminData.email,
          password,
          role: "admin",
        });

        await admin.save();
        console.log(`✅ Admin created: ${adminData.email}`);
      } else {
        console.log(`ℹ️ Already exists: ${adminData.email}`);
      }
    }
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
  }
};