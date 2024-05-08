import React from "react";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

import useResourceFetch from "../../../../hooks/useFetch";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { AppointmentRequest } from "../../../../types/type.AppoinmentRequest";
import Loader from "../../../../components/Loader/Loader";
const AppointmentUpdates = () => {
  const { currentUser } = useSelector((state: RootState) => state?.user);

  const { data: appointment, isLoading } = useResourceFetch(
    `/api/v1/appointment/getPatientAppointment/${currentUser?._id}`
  );

  if (isLoading) {
    <Loader />;
    return;
  }
  const { data } = appointment;
  console.log(data);
  const getStatusIcon = (status: string) => {
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
        {data?.map((appointment: AppointmentRequest, index: number) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-800">
                Appointment ID: {appointment._id}
              </h2>
              {getStatusIcon(appointment.status)}
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
        ))}
      </div>
    </div>
  );
};

export default AppointmentUpdates;
