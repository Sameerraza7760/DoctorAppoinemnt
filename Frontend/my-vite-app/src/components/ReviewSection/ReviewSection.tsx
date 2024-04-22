import React, { useState, useEffect } from "react";
import { Review } from "../../types/type.review";
import useResourceFetch from "../../hooks/useFetch";

const ReviewSection = ({ doctorId }) => {
  const { data: reviewsData, isLoading } = useResourceFetch(
    " http://localhost:8000/api/v1/patients/getReviews"
  );

  //   useEffect(() => {
  //     if (reviewsData) {
  //       setReviews(reviewsData.reviews);
  //     }
  //   }, [reviewsData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="bg-white shadow-md rounded-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Patient Reviews
      </h2>
      <div className="flex flex-col space-y-4">
        {reviewsData.map((review, index) => (
          <div key={index} className="bg-gray-200 p-4 rounded-md">
            <p className="text-gray-800">{`"${review.content}"`}</p>
            <p className="text-gray-600">{`- ${review.author}`}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewSection;
