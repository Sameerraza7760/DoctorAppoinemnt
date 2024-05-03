import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import ReviewSection from "../../components/ReviewSection/ReviewSection";
import useResourceFetch from "../../hooks/useFetch";
import useToggle from "../../hooks/useToggle";
import { DoctorData } from "../../types/type.Doctor";
import AppointmentDrawer from "./../../components/Drawer/Drawer";
import { additionalDoctorDetails } from "../../types/type.Doctor";
export interface ExtendedDoctorData
  extends DoctorData,
    additionalDoctorDetails {}
const DoctorDetailPage = () => {
  const { id } = useParams();

  const { data, isLoading } = useResourceFetch(`/api/v1/doctors/${id}`);
  const { isOpen, open, close } = useToggle();

  if (isLoading) {
    return <Loader />;
  }

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
          <ReviewSection doctorId={doctor._id} />
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
