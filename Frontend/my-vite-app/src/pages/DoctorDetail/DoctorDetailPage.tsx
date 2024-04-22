import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import useResourceFetch from "../../hooks/useFetch";
import useToggle from "../../hooks/useToggle";
import { DoctorData, additionalDoctorDetails } from "../../types/type.Doctor";
import AppointmentDrawer from "./../../components/Drawer/Drawer";
import usePostData from "../../hooks/usePostData";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Review } from "../../types/type.review";

export interface ExtendedDoctorData
  extends DoctorData,
    additionalDoctorDetails {}
const DoctorDetailPage = () => {
  const { id } = useParams();
  const { postData } = usePostData();
  const { data, isLoading } = useResourceFetch(
    `http://localhost:8000/api/v1/doctors/${id}`
  );
  const { isOpen, open, close } = useToggle();
  const [formData, setFormData] = useState<Review>({
    reviewContent: "",
    author: "",
    doctorId: "",
    date: "",
  });

  const { user } = useSelector((state: any) => state.user.currentUser);
  console.log(user);

  if (isLoading) {
    return <Loader />;
  }
  const addRewiew = () => {
    const url = "http://localhost:8000/api/v1/patients/addReview";
    postData(url, formData);
  };
  const { doctor }: { doctor: ExtendedDoctorData } = data;
  const renderServices = () => {
    if (doctor.services && doctor.services.length > 0) {
      return (
        <ul className="list-disc list-inside">
          {doctor.services?.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    } else {
      return <p>No services available</p>;
    }
  };
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      reviewContent: event.target.value,
      author: user.fullName,
      doctorId: doctor._id,
      date: currentDate,
    });
  };

  // const addRewiew = () => {
  //   console.log("Submitted comment:", formData);
  // };
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-500 shadow-md py-4">
        <div className="container mx-auto flex items-center justify-between px-4">
          <h1 className="text-3xl font-semibold text-white">
            Dr.{doctor.fullName}
          </h1>
          <img
            src={doctor.doctorImage}
            alt="Doctor's Profile Picture"
            className="w-16 h-16 rounded-full"
          />
        </div>
      </header>
      <main className="container mx-auto py-8">
        <section className="bg-white shadow-md rounded-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            {doctor.email}
          </h2>
          <p className="text-gray-700">
            Dr. {doctor.fullName} is a board-certified physician with over 15
            years of experience...
          </p>
          <button
            onClick={open}
            className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Book Appointment
          </button>
        </section>
        <section className="bg-white shadow-md rounded-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Services Offered
          </h2>
          {renderServices()}
        </section>
        <section className="bg-white shadow-md rounded-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Specialization
          </h2>
          <p className="text-gray-700"> {doctor.specialization}</p>
        </section>
        <section className="bg-white shadow-md rounded-md p-6 mb-8 h-auto">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Patient Reviews
          </h2>
          <div className="flex flex-col space-y-4">
            <div className="bg-gray-200 p-4 rounded-md">
              <p className="text-gray-800">
                "Dr. John Doe is an amazing doctor! Highly recommended."
              </p>
              <p className="text-gray-600">- Jane Smith</p>
            </div>
            <div className="bg-gray-200 p-4 rounded-md">
              <p className="text-gray-800">
                "Excellent bedside manner and very knowledgeable."
              </p>
              <p className="text-gray-600">- John Doe</p>
            </div>
          </div>
        </section>{" "}
        <section className="bg-white shadow-md rounded-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Leave a Comment
          </h2>
          <textarea
            value={formData.reviewContent}
            onChange={handleCommentChange}
            placeholder="Enter your comment"
            className="w-full border rounded-md p-2"
            rows={4}
          ></textarea>
          <button
            onClick={addRewiew}
            className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Submit Comment
          </button>
        </section>
      </main>
      <footer className="bg-white shadow-md py-4 mt-8">
        <div className="container mx-auto text-center">
          <p className="text-gray-600">&copy; 2024 Doctor's Office</p>
        </div>
      </footer>
      <AppointmentDrawer
        isOpen={isOpen}
        onClose={close}
        doctorDetail={data.doctor}
      />
    </div>
  );
};

export default DoctorDetailPage;
