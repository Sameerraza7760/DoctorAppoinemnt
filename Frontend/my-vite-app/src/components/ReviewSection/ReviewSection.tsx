import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import useResourceFetch from "../../hooks/useFetch";
import usePostData from "../../hooks/usePostData";
import { Review } from "./../../types/type.review";
interface reviewSectionProps {
  doctorId: string;
}

const ReviewSection = ({ doctorId }: reviewSectionProps) => {
  const { data } = useResourceFetch(`/api/v1/patients/getReviews/${doctorId}`);

  const { postData } = usePostData();
  const { currentUser } = useSelector((state: any) => state?.user);
  const [reviewsData, setReviews] = useState<Review[]>([]);
  const [formData, setFormData] = useState<Review>({
    reviewContent: "",
    author: "",
    doctorId: "",
    date: "",
  });

  // if (isLoading) return <Loader />;

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const handleReviewChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      reviewContent: event.target.value,
      author: currentUser.fullName,
      doctorId: doctorId,
      date: currentDate,
    });
  };

  const handleAddRewiew = async () => {
    if (!formData.reviewContent) return;
    const url = "/api/v1/patients/addReview";
    await postData(url, formData);

    setFormData({
      reviewContent: "",
      author: "",
      doctorId: "",
      date: "",
    });
  };

  useEffect(() => {
    const socket = io("http://localhost:8001");
    socket.on("reviewsFetched", ({ savedReview }) => {
      setReviews((prevReviews) => [...prevReviews, savedReview]);
      console.log("saved,", savedReview);
    });
  }, []);

  useEffect(() => {
    if (data && data.reviews) {
      setReviews(data.reviews);
    }
  }, [data]);

  const renderReviews = () => {
    if (reviewsData && reviewsData.length > 0) {
      return reviewsData.map((review: Review, index: number) => (
        <div key={index} className="bg-gray-200 p-4 rounded-md">
          <p className="text-gray-800">{`"${review.reviewContent}"`}</p>
          <p className="text-gray-600">{`- ${review.author}`}</p>
          <p className="text-gray-500">{`Date: ${review.date}`}</p>{" "}
          {/* Display the date */}
        </div>
      ));
    } else {
      return <p>No reviews yet available</p>;
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Patient Reviews
      </h2>
      <div className="flex flex-col space-y-4">
        {renderReviews()}
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Leave a Comment
        </h2>
        <textarea
          value={formData.reviewContent}
          onChange={handleReviewChange}
          placeholder="Enter your comment"
          className="w-full border rounded-md p-2"
          required
          rows={4}
        ></textarea>
        <button
          onClick={handleAddRewiew}
          className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Submit Comment
        </button>
      </div>
    </>
  );
};

export default ReviewSection;
