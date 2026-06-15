const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// GET /api/orders - Fetch all orders (admin)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/orders - Create new order
router.post('/', async (req, res) => {
  try {
    const order = new Order({
      customerName: req.body.customer_name,
      customerEmail: req.body.customer_email,
      customerPhone: req.body.customer_phone,
      deliveryDate: new Date(req.body.delivery_date),
      deliveryAddress: req.body.delivery_address,
      notes: req.body.notes,
      total: req.body.total,
      items: req.body.items.map(item => ({
        productId: item.product?.id || item.productId,
        productName: item.product?.name || item.productName,
        quantity: item.quantity,
        selectedFlavor: item.selectedFlavor,
        selectedSize: item.selectedSize,
        deliveryDate: item.deliveryDate,
        priceAtOrder: item.product?.price || item.priceAtOrder
      })),
      status: 'pending'
    });

    await order.save();

    res.status(201).json({
      success: true,
      order: {
        id: order._id.toString(),
        customer_name: order.customerName,
        customer_email: order.customerEmail,
        total: order.total,
        status: order.status,
        created_at: order.createdAt.toISOString()
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/orders/:id/status - Update order status (admin)
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
