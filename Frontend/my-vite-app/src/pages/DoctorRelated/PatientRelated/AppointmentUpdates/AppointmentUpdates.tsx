import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import Loader from "../../../../components/Loader/Loader";
import useResourceFetch from "../../../../hooks/useFetch";
import { RootState } from "../../../../store/store";
import { AppointmentRequest } from "../../../../types/type.AppoinmentRequest";
const AppointmentUpdates = () => {
  const { currentUser } = useSelector((state: RootState) => state?.user);

  const { data: appointment, isLoading } = useResourceFetch(
    `/api/v1/appointment/getPatientAppointment/${currentUser?._id}`
  );

  // const { data } = appointment;
  // console.log(data);
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Accepted":
        return <CheckCircleOutlined className="text-blue-500" />;
      case "Pending":
        return <ClockCircleOutlined className="text-green-500" />;
      case "Cancelled":
        return <CloseCircleOutlined className="text-red-500" />;
      default:
        return null;
    }
  };
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-8 h-auto max-h-[calc(100vh-2rem)]">
      <h1 className="text-3xl font-semibold text-blue-600 mb-4 font-serif">
        Appointment Updates
      </h1>
      <div className="grid grid-cols-1 gap-4 h-auto md:grid-cols-2 lg:grid-cols-3 ">
        {appointment?.data?.map(
          (appointment: AppointmentRequest, index: number) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:scale-105"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-800">
                  Appointment ID: {appointment._id}
                </h2>
                <span> {getStatusIcon(appointment.status)}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                {/* Doctor: {appointment.} */}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Date: {appointment.appointmentDate}
              </p>
              <p className="text-sm text-gray-600">
                Status:{" "}
                <span className="font-semibold">{appointment.status}</span>
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AppointmentUpdates;
