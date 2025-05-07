import React from 'react';
import { useSelector } from 'react-redux';
import { useGetReviewsByUserIdQuery } from '../../../redux/features/reviews/reviewsApi';
import { useNavigate } from 'react-router-dom';

const UserReviews = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: reviews, error, isLoading } = useGetReviewsByUserIdQuery(user?.id);
  const navigate = useNavigate();

  if (isLoading) return <div className="text-center py-6 text-gray-500">Laddar recensioner...</div>;
  if (error || !reviews?.length)
    return <div className="text-center py-6 text-red-500">Inga recensioner hittades.</div>;

  const handleCardClick = () => {
    navigate('/shop');
  };

  return (
    <div className="py-6 px-4">
      <h2 className="text-2xl font-bold mb-6">Dina recensioner</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white shadow-sm hover:shadow-md border border-gray-200 rounded-lg p-5 transition-transform transform hover:scale-105"
          >
            <div className="mb-2">
              <span className="text-yellow-600 font-bold">Betyg:</span>{' '}
              <span className="text-gray-800">{review.rating} / 5 ⭐</span>
            </div>
            <div className="mb-2">
              <p className="text-gray-700">
                <span className="font-semibold">Kommentar:</span> {review.comment}
              </p>
            </div>
            <div className="text-sm text-gray-500 mb-1">
              <span className="font-medium">Produkt-ID:</span> {review.productId}
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-medium">Datum:</span>{' '}
              {new Date(review.createdAt).toLocaleDateString('sv-SE', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
        ))}

        <div
          onClick={handleCardClick}
          className="bg-gray-100 border border-dashed border-gray-300 text-center flex flex-col items-center justify-center rounded-lg p-6 cursor-pointer hover:bg-primary hover:text-white transition-all duration-200"
        >
          <span className="text-3xl font-bold mb-1">+</span>
          <p className="text-sm font-medium">Lägg till ny recension</p>
        </div>
      </div>
    </div>
  );
};

export default UserReviews;
