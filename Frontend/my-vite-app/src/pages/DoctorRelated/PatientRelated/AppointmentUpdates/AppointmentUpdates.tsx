import React from "react";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

import useResourceFetch from "../../../../hooks/useFetch";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
const AppointmentUpdates = () => {
  const { currentUser } = useSelector((state: RootState) => state?.user);

  const { data, isLoading } = useResourceFetch(
    `/api/v1/appointment/getAppointment/${currentUser?._id}`
  );

  
  const appointments = [
    {
      id: "123",
      doctor: "Dr. Smith",
      date: "2024-05-10",
      status: "Confirmed",
    },
    {
      id: "124",
      doctor: "Dr. Johnson",
      date: "2024-05-15",
      status: "Pending",
    },
    {
      id: "125",
      doctor: "Dr. Lee",
      date: "2024-05-20",
      status: "Cancelled",
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "Confirmed":
        return <CheckCircleOutlined style={{ color: "#52c41a" }} />;
      case "Pending":
        return <ClockCircleOutlined style={{ color: "#faad14" }} />;
      case "Cancelled":
        return <CloseCircleOutlined style={{ color: "#f5222d" }} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 h-auto">
      <h1 className="text-3xl font-semibold text-blue-600 mb-4 font-serif">
        Appointment Updates
      </h1>
      <div className="grid grid-cols-1 gap-4 h-auto md:grid-cols-2 lg:grid-cols-3">
        {appointments.map((appointment, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-800">
                Appointment ID: {appointment.id}
              </h2>
              {getStatusIcon(appointment.status)}
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Doctor: {appointment.doctor}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              Date: {appointment.date}
            </p>
            <p className="text-sm text-gray-600">
              Status:{" "}
              <span className="font-semibold">{appointment.status}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentUpdates;
