import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  orderBy,
  Timestamp,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { db } from '../firebase/config';

// Add a review
export const addReview = async (userId, userName, itemId, itemType, rating, comment) => {
  try {
    const reviewData = {
      userId,
      userName,
      itemId,
      itemType, // 'location', 'route', or 'recommendation'
      rating,
      comment,
      createdAt: Timestamp.now()
    };

    const docRef = await addDoc(collection(db, 'reviews'), reviewData);
    return { id: docRef.id, ...reviewData };
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};

// Get reviews for a specific item
export const getReviews = async (itemId, itemType) => {
  try {
    const q = query(
      collection(db, 'reviews'),
      where('itemId', '==', itemId),
      where('itemType', '==', itemType),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const reviews = [];
    querySnapshot.forEach((doc) => {
      reviews.push({ id: doc.id, ...doc.data() });
    });

    return reviews;
  } catch (error) {
    console.error('Error getting reviews:', error);
    throw error;
  }
};

// Delete a review
export const deleteReview = async (reviewId) => {
  try {
    await deleteDoc(doc(db, 'reviews', reviewId));
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
};

// Calculate average rating
export const calculateAverageRating = (reviews) => {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return (sum / reviews.length).toFixed(1);
};