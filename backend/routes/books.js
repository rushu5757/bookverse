const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Book = require('../models/Book');

// Add book
router.post('/', auth, async (req, res) => {
  try {
    const book = new Book({ ...req.body, addedBy: req.user.id });
    await book.save();
    res.json(book);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get books with pagination
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  try {
    const books = await Book.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('addedBy', 'name email');
    const count = await Book.countDocuments();
    res.json({ books, totalPages: Math.ceil(count / limit) });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Edit book
router.put('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (book.addedBy.toString() !== req.user.id)
      return res.status(401).json({ message: 'Not authorized' });

    Object.assign(book, req.body);
    await book.save();
    res.json(book);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Delete book
router.delete('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (book.addedBy.toString() !== req.user.id)
      return res.status(401).json({ message: 'Not authorized' });

    await book.remove();
    res.json({ message: 'Book removed' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;

