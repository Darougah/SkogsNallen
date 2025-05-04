import React, { useState } from "react";
import commentorIcon from "../../../assets/avatar.png";
import { formatDate } from "../../../utils/formatDate";
import RatingStars from "../../../components/RatingStars";
import PostAreview from "./PostAreview";

export const ReviewsCard = ({ productReviews = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="my-6 bg-white p-6 md:p-8 rounded-lg shadow-md">
      {productReviews.length > 0 ? (
        <>
          <h3 className="text-xl font-semibold mb-6 text-gray-800">Alla kommentarer</h3>
          <div className="space-y-6">
            {productReviews.map((review, index) => (
              <div key={index} className="flex gap-4 items-start border-b pb-5">
                <div className="flex-shrink-0">
                  <img
                    src={review.userId?.avatar || commentorIcon}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover border shadow-sm"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="text-blue-500 font-medium capitalize hover:underline">
                      {review.userId?.username || "Anonym"}
                    </p>
                    <p className="text-xs text-gray-400 italic">{formatDate(review?.createdAt)}</p>
                  </div>
                  <RatingStars rating={review?.rating} />
                  <p className="text-sm text-gray-700 mt-1">{review?.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-500 text-center">Inga recensioner ännu.</p>
      )}

      <div className="mt-10 text-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-md transition duration-200"
        >
          Skriv en recension
        </button>
      </div>

      <PostAreview
        isModalOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
