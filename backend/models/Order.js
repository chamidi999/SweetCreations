const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  customerEmail: {
    type: String,
    required: true,
    trim: true
  },
  customerPhone: {
    type: String,
    trim: true
  },
  deliveryDate: {
    type: Date,
    required: true
  },
  deliveryAddress: {
    type: String,
    trim: true
  },
  notes: {
    type: String
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    productName: String,
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    selectedFlavor: String,
    selectedSize: String,
    deliveryDate: String,
    priceAtOrder: Number
  }],
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
