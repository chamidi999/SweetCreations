require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const inquiriesRouter = require('./routes/inquiries');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'SweetCreations API is running' });
});

// Routes
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/inquiries', inquiriesRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5001;

// --- Sample Data Injector Task ---
const Product = require('./models/Product');
const sampleProducts = require('./sampleProducts');

const injectSampleData = async () => {
  try {
    // දැනට ඩේටාබේස් එකේ තියෙන ප්‍රොඩක්ට්ස් ගණන චෙක් කරනවා
    const count = await Product.countDocuments();
    
    // ප්‍රොඩක්ට්ස් 3කට වඩා අඩුයි නම් (නැත්නම් හිස් නම්) පරණ ඒවා ක්ලීන් කරලා අලුත් ඒවා දානවා
    if (count <= 3) { 
      await Product.deleteMany({});
      console.log("🧹 Clearing and inserting fresh sample cakes...");

      await Product.insertMany(sampleProducts);
      console.log("🎂 Success! Sample cakes forced into MongoDB!");
    } else {
      console.log(`📊 Products already exist (${count} items). Skipping injection.`);
    }
  } catch (err) {
    console.error("❌ Error injecting data:", err);
  }
};

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  // ඩේටාබේස් කනෙක්ෂන් එක ස්ථායී (stable) වෙන්න තත්පර 2ක් දීලා script එක රන් කරනවා
  setTimeout(async () => {
    console.log("⚡ Running background database tasks...");
    await injectSampleData();
  }, 2000);
});
