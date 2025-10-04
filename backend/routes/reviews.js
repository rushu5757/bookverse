const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Review = require('../models/Review');

// Add review
router.post('/', auth, async (req, res) => {
  try {
    const review = new Review({ ...req.body, userId: req.user.id });
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get reviews for a book
router.get('/:bookId', async (req, res) => {
  try {
    const reviews = await Review.find({ bookId: req.params.bookId }).populate('userId', 'name');
    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1);
    res.json({ reviews, avgRating });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Edit review
router.put('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.userId.toString() !== req.user.id)
      return res.status(401).json({ message: 'Not authorized' });

    Object.assign(review, req.body);
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Delete review
router.delete('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.userId.toString() !== req.user.id)
      return res.status(401).json({ message: 'Not authorized' });

    await review.remove();
    res.json({ message: 'Review removed' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;

