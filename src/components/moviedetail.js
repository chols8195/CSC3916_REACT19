import React, { useEffect, useState } from 'react';
import { fetchMovie, submitReview } from '../actions/movieActions';
import { useDispatch, useSelector } from 'react-redux';
import { BsStarFill, BsStar, BsArrowLeft, BsPersonCircle } from 'react-icons/bs';
import { useParams, useNavigate } from 'react-router-dom';

const MovieDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movieId } = useParams();
  const selectedMovie = useSelector(state => state.movie.selectedMovie);
  const username = useSelector(state => state.auth.username);
  const loggedIn = useSelector(state => state.auth.loggedIn);

  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovie(movieId));
    }
  }, [dispatch, movieId]);

  const handleReviewSubmit = (e) => {
      e.preventDefault();
      if (!selectedMovie || !loggedIn) {
        alert('Please sign in to submit a review');
        return;
      }

      const reviewData = {
        movieId: selectedMovie._id,
        review: review,
        rating: parseInt(rating)
        // username is now retrieved from JWT on server side
      };

      dispatch(submitReview(reviewData));
      setReview('');
      setRating(5);
      setSubmitted(true);

      setTimeout(() => {
        dispatch(fetchMovie(movieId));
        setSubmitted(false);
      }, 1000);
    };

  const renderStars = (count, interactive = false) => {
    const stars = [];
    const displayRating = interactive ? (hoverRating || rating) : count;
    
    for (let i = 1; i <= 5; i++) {
      if (interactive) {
        stars.push(
          <button
            key={i}
            type="button"
            className={`star-btn ${i <= displayRating ? 'active' : ''}`}
            onClick={() => setRating(i)}
            onMouseEnter={() => setHoverRating(i)}
            onMouseLeave={() => setHoverRating(0)}
          >
            {i <= displayRating ? <BsStarFill /> : <BsStar />}
          </button>
        );
      } else {
        stars.push(
          i <= count ? <BsStarFill key={i} /> : <BsStar key={i} />
        );
      }
    }
    return stars;
  };

  if (!selectedMovie) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <span>Loading movie details...</span>
      </div>
    );
  }

  return (
    <div className="movie-detail">
      <button className="btn-back" onClick={() => navigate(-1)}>
        <BsArrowLeft /> Back
      </button>

      <div className="movie-detail-header">
        <div className="movie-detail-poster">
          <img src={selectedMovie.imageUrl} alt={selectedMovie.title} />
        </div>
        
        <div className="movie-detail-info">
          <h1 className="movie-detail-title">{selectedMovie.title}</h1>
          
          <div className="movie-detail-meta">
            <span className="meta-tag rating">
              <BsStarFill /> {selectedMovie.avgRating ? selectedMovie.avgRating.toFixed(1) : 'N/A'}
            </span>
            <span className="meta-tag">{selectedMovie.releaseDate}</span>
            <span className="meta-tag">{selectedMovie.genre}</span>
          </div>

          <p className="movie-detail-description">
            A captivating film featuring an amazing cast and stunning visuals. 
            Don't miss this incredible cinematic experience!
          </p>

          <button className="btn-get-tickets">
            Get Tickets
          </button>
        </div>
      </div>

      {/* Cast Section */}
      <div className="cast-section">
        <h2 className="section-title">Cast</h2>
        <div className="cast-grid">
          {selectedMovie.actors && selectedMovie.actors.map((actor, i) => (
            <div key={i} className="cast-card">
              <div className="cast-icon">
                <BsPersonCircle />
              </div>
              <div className="cast-name">{actor.actorName}</div>
              <div className="cast-character">{actor.characterName}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <div className="reviews-header">
          <h2 className="reviews-title">
            Reviews ({selectedMovie.reviews ? selectedMovie.reviews.length : 0})
          </h2>
        </div>

        {/* Review Form */}
        {loggedIn ? (
          <form className="review-form" onSubmit={handleReviewSubmit}>
            {submitted && (
              <p style={{ color: '#4caf50', marginBottom: '15px' }}>
                ✓ Review submitted successfully!
              </p>
            )}
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your thoughts about this movie..."
              required
            />
            <div className="review-form-footer">
              <div className="rating-select">
                {renderStars(rating, true)}
              </div>
              <button type="submit" className="btn-submit-review">
                Submit Review
              </button>
            </div>
          </form>
        ) : (
          <div className="review-form" style={{ textAlign: 'center', padding: '30px' }}>
            <p style={{ color: '#888', marginBottom: '15px' }}>
              Sign in to write a review
            </p>
            <button 
              className="btn-submit-review"
              onClick={() => navigate('/signin')}
            >
              Sign In
            </button>
          </div>
        )}

        {/* Review List */}
        {selectedMovie.reviews && selectedMovie.reviews.length > 0 ? (
          selectedMovie.reviews.map((rev, i) => (
            <div key={i} className="review-item">
              <div className="review-header">
                <span className="review-user">{rev.username}</span>
                <span className="review-rating">
                  <BsStarFill /> {rev.rating}
                </span>
              </div>
              <p className="review-text">{rev.review}</p>
            </div>
          ))
        ) : (
          <p style={{ color: '#888', textAlign: 'center', padding: '20px' }}>
            No reviews yet. Be the first to review!
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;