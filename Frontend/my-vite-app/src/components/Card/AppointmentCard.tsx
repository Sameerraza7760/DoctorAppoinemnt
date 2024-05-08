import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import usePostData from "../../hooks/useApiRequests";
import { AppointmentRequest } from "../../types/type.AppoinmentRequest";
import socket from "../../services/socketService";
import Button from "../Button/Button";
import { useState } from "react";
import { useEffect } from "react";
interface AppointmentCard {
  appointment: AppointmentRequest;
}

function AppointmentCard({ appointment }: AppointmentCard) {
  const [appointments, setAppointments] =
    useState<AppointmentRequest>(appointment);
  const { putData } = usePostData();
  const { _id, fullName, appointmentDate, appointmentTime, address, status } =
    appointments;
// console.log(status);

  const updateAppointmentStatus = async (status: string) => {
    const url = `/api/v1/appointment/acceptappointment/${_id}`;
    const data = { status: status };

    try {
      const response = await putData(url, data);
      socket.emit("appointmentStatusUpdated", { id: _id, status: status });
      console.log("Appointment status updated:", response);
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };
  useEffect(() => {
    socket.connect();

    socket.on(
      "appointmentStatusUpdated",
      ({ id, status }) => {
        console.log(status);

        if (id === _id) {
          setAppointments((prevAppointments) => ({
            ...prevAppointments,
            status: status,
          }));
        }
      },
      
    );

    return () => {
      socket.disconnect();
      socket.off("appointmentStatusUpdated");
    };
  }, [appointments]);

  console.log("e", status);

  return (
    <div
      key={_id}
      className="bg-white rounded-lg mx-auto w-[90%] shadow-md p-6 mb-4"
    >
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src="https://t4.ftcdn.net/jpg/00/99/45/65/240_F_99456590_ptYpzWcFSDPvRq879SvpuZC4qJ4dMnZ1.jpg"
            alt=""
          />
        </div>
        <div className="ml-4">
          <p className="text-sm text-green-500">{address}</p>
          <p className="text-sm text-gray-600">{status} </p>
          <h2 className="text-xl font-bold text-blue-800">{fullName}</h2>
        </div>
      </div>
      <div className="flex items-center">
        <>
          <div className="relative mr-8">
            <label
              htmlFor={`date_${_id}`}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date:
            </label>
            <div className="absolute inset-y-0 left-0 flex items-center mt-7 pl-3 pointer-events-none">
              <CalendarOutlined className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              id={`date_${_id}`}
              value={appointmentDate}
              readOnly
              className="border rounded p-2 pl-10 w-32 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <label
              htmlFor={`time_${_id}`}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Time:
            </label>
            <div className="absolute inset-y-0 left-0 flex items-center mt-7 pl-3 pointer-events-none">
              <ClockCircleOutlined className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="time"
              id={`time_${_id}`}
              value={appointmentTime}
              readOnly
              className="border rounded p-2 pl-10 w-32 focus:outline-none focus:border-blue-500"
            />
          </div>
        </>
      </div>

      <div className="gap-5 flex">
        {status === "pending" && (
          <>
            <Button
              onClick={() => updateAppointmentStatus("accepted")}
              label="Approved"
              styling="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
              isSubmitting={false}
              type="button"
            />
            <Button
              onClick={() => updateAppointmentStatus("cancelled")}
              label="Cancel"
              styling="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
              isSubmitting={false}
              type="button"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default AppointmentCard;
