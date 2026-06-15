const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');

// GET /api/inquiries - Fetch all inquiries (admin)
router.get('/', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/inquiries - Create new inquiry
router.post('/', async (req, res) => {
  try {
    const inquiry = new Inquiry({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
      imageUrl: req.body.image_url,
      status: 'new'
    });

    await inquiry.save();

    res.status(201).json({
      success: true,
      inquiry: {
        id: inquiry._id.toString(),
        name: inquiry.name,
        email: inquiry.email,
        status: inquiry.status,
        created_at: inquiry.createdAt.toISOString()
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/inquiries/:id/status - Update inquiry status (admin)
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }

    res.json(inquiry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
