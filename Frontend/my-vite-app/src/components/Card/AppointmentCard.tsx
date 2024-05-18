import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import usePostData from "../../hooks/useApiRequests";
import { AppointmentRequest } from "../../types/type.AppoinmentRequest";
import socket from "../../services/socketService";
import Button from "../Button/Button";
import { useState } from "react";
import { useEffect } from "react";
import { getStatusColor } from "./../../utills/statusUtills";
interface AppointmentCard {
  appointment: AppointmentRequest;
}

function AppointmentCard({ appointment }: AppointmentCard) {
  const [appointments, setAppointments] =
    useState<AppointmentRequest>(appointment);
  const { putData } = usePostData();
  const {
    _id,
    fullName,
    appointmentDate,
    appointmentTime,
    address,
    status,
    patientId,
  } = appointments;
  console.log(appointments);

  console.log("f", patientId);
  const updateAppointmentStatus = async (status: string) => {
    const url = `/api/v1/appointment/acceptappointment/${_id}`;
    const data = { status: status };

    try {
      const response = await putData(url, data);
      socket.emit("appointmentStatusUpdated", {
        id: _id,
        status: status,
      });
      socket.emit("sendNotificationtoPatient", { patientId, status });
      console.log("Appointment status updated:", response);
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };
  useEffect(() => {
    socket.connect();

    socket.on("appointmentStatusUpdated", ({ id, status }) => {
      console.log(status);

      if (id === _id) {
        setAppointments((prevAppointments) => ({
          ...prevAppointments,
          status: status,
        }));
      }
    });

    return () => {
      socket.disconnect();
      socket.off("appointmentStatusUpdated");
    };
  }, [appointments]);

  return (
    <div className="bg-white rounded-lg mx-auto w-full md:w-[90%] lg:w-[75%] xl:w-[60%] shadow-md p-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            className="w-16 h-16 rounded-full object-cover mr-4"
            src="https://t4.ftcdn.net/jpg/00/99/45/65/240_F_99456590_ptYpzWcFSDPvRq879SvpuZC4qJ4dMnZ1.jpg"
            alt=""
          />
          <div>
            <p className="text-sm text-green-500">{address}</p>
            <p className={`text-sm font-semibold ${getStatusColor(status)}`}>
              {status}
            </p>
            <h2 className="text-lg font-semibold text-blue-800">{fullName}</h2>
          </div>
        </div>
        <div className="flex items-center">
          <div className="mr-8">
            <label
              htmlFor={`date_${_id}`}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date:
            </label>
            <div className="flex items-center">
              <CalendarOutlined className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="date"
                id={`date_${_id}`}
                value={appointmentDate}
                readOnly
                className="border rounded p-2 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor={`time_${_id}`}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Time:
            </label>
            <div className="flex items-center">
              <ClockCircleOutlined className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="time"
                id={`time_${_id}`}
                value={appointmentTime}
                readOnly
                className="border rounded p-2 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        {status === "Pending" && (
          <div className="flex gap-4">
            <Button
              onClick={() => updateAppointmentStatus("Accepted")}
              label="Approve"
              styling="bg-blue-500 text-white px-4 py-2 rounded-md"
              isSubmitting={false}
              type="button"
            />
            <Button
              onClick={() => updateAppointmentStatus("Cancelled")}
              label="Cancel"
              styling="bg-red-500 text-white px-4 py-2 rounded-md"
              isSubmitting={false}
              type="button"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default AppointmentCard;
