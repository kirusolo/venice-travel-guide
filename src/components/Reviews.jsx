import React, { useState, useEffect } from 'react';
import { Star, Trash2, AlertCircle, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { addReview, getReviews, deleteReview, calculateAverageRating } from '../services/reviewsService';

const Reviews = ({ itemId, itemType, itemName }) => {
  const { currentUser } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  useEffect(() => {
    loadReviews();
  }, [itemId, itemType]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const fetchedReviews = await getReviews(itemId, itemType);
      setReviews(fetchedReviews);
    } catch (err) {
      console.error('Error loading reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      setShowAuthPrompt(true);
      return;
    }

    if (comment.trim().length < 10) {
      setError('Review must be at least 10 characters');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      const newReview = await addReview(
        currentUser.uid,
        currentUser.displayName || 'Anonymous',
        itemId,
        itemType,
        rating,
        comment.trim()
      );
      
      setReviews([newReview, ...reviews]);
      setComment('');
      setRating(5);
      setShowAuthPrompt(false);
    } catch (err) {
      setError('Failed to submit review. Please try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    try {
      await deleteReview(reviewId);
      setReviews(reviews.filter(r => r.id !== reviewId));
    } catch (err) {
      alert('Failed to delete review');
    }
  };

  const averageRating = calculateAverageRating(reviews);

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
      {/* Header with Average Rating */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Reviews</h3>
          {reviews.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    className={
                      star <= Math.round(averageRating)
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-gray-300 dark:text-gray-600'
                    }
                  />
                ))}
              </div>
              <span className="text-lg font-semibold text-gray-800 dark:text-white">
                {averageRating}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Review Form */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-8">
        <h4 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <MessageSquare size={20} />
          Write a Review
        </h4>
        
        {!currentUser && showAuthPrompt && (
          <div className="mb-4 bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Please sign in to leave a review
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Star Rating */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Rating
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  className="focus:outline-none transition-transform hover:scale-110"
                  disabled={!currentUser}
                >
                  <Star
                    size={32}
                    className={
                      star <= (hoveredStar || rating)
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-gray-300 dark:text-gray-600'
                    }
                  />
                </button>
              ))}
              <span className="ml-2 text-gray-600 dark:text-gray-400 self-center">
                {rating} {rating === 1 ? 'star' : 'stars'}
              </span>
            </div>
          </div>

          {/* Comment */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Review
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="Share your experience... (minimum 10 characters)"
              minLength="10"
              disabled={!currentUser}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {comment.length} / 10 minimum characters
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 bg-red-50 dark:bg-red-900 border-l-4 border-red-500 p-3 rounded flex items-start gap-2">
              <AlertCircle size={20} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting || !currentUser}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Submitting...
              </>
            ) : (
              <>
                {currentUser ? 'Submit Review' : 'Sign in to Review'}
              </>
            )}
          </button>
        </form>
      </div>

      {/* Reviews List */}
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-400 mt-4">Loading reviews...</p>
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-8">
          <MessageSquare size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-gray-600 dark:text-gray-400 text-lg">No reviews yet</p>
          <p className="text-gray-500 dark:text-gray-500 text-sm">Be the first to review {itemName}!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="font-semibold text-gray-800 dark:text-white">
                      {review.userName}
                    </h5>
                    {currentUser && currentUser.uid === review.userId && (
                      <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-1 rounded">
                        You
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={
                            star <= review.rating
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-gray-300 dark:text-gray-600'
                          }
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                </div>
                {currentUser && currentUser.uid === review.userId && (
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition"
                    title="Delete review"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
              <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;