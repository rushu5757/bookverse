import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState('');
  const [reviewText, setReviewText] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/books`)
      .then(res => setBook(res.data.find(b => b._id === id)))
      .catch(err => console.error(err));

    axios.get(`http://localhost:5000/api/reviews/${id}`)
      .then(res => setReviews(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleAddReview = async () => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Login first');

    try {
      const res = await axios.post(
        `http://localhost:5000/api/reviews/${id}`,
        { rating, reviewText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReviews([...reviews, res.data]);
      setRating(''); setReviewText('');
    } catch (err) {
      console.error(err);
      alert('Failed to add review');
    }
  };

  return (
    <div className="container mt-4">
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Year:</strong> {book.year}</p>
      <p><strong>Description:</strong> {book.description}</p>

      <h4>Reviews</h4>
      {reviews.map(r => (
        <div key={r._id} className="border p-2 mb-2">
          <p>Rating: {r.rating}</p>
          <p>{r.reviewText}</p>
        </div>
      ))}

      <div className="mt-3">
        <input type="number" placeholder="Rating" value={rating} onChange={e => setRating(e.target.value)} className="form-control mb-2" />
        <textarea placeholder="Review" value={reviewText} onChange={e => setReviewText(e.target.value)} className="form-control mb-2" />
        <button onClick={handleAddReview} className="btn btn-success">Add Review</button>
      </div>
    </div>
  );
};

export default BookDetails;
