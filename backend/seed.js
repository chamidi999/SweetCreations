require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const sampleProducts = require('./sampleProducts');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  await connectDB();

  // Clear existing products
  await Product.deleteMany({});
  console.log('Cleared existing products');

  // Insert new products
  await Product.insertMany(sampleProducts);
  console.log('Inserted products');

  console.log('Database seeded successfully!');
  process.exit(0);
};

seedDatabase();
