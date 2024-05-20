import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import usePostData from "../../hooks/useApiRequests";
import { AppointmentRequest } from "../../types/type.AppoinmentRequest";
import Button from "../Button/Button";
import { getStatusColor } from "./../../utills/statusUtills";
import useSocket from "../../hooks/useSocket";

interface AppointmentCard {
  appointment: AppointmentRequest;
}

function AppointmentCard({ appointment }: AppointmentCard) {
  const { socket, isConnected } = useSocket();
  const [appointments, setAppointments] = useState<AppointmentRequest>(appointment);
  const { putData } = usePostData();
  const { _id, fullName, appointmentDate, appointmentTime, address, status, patientId } = appointments;
  console.log(appointments);
  console.log("f", patientId);

  const updateAppointmentStatus = async (status: string) => {
    const url = `/api/v1/appointment/acceptappointment/${_id}`;
    const data = { status: status };

    try {
      const response = await putData(url, data);
      socket?.emit("appointmentStatusUpdated", {
        id: _id,
        status: status,
      });
      socket?.emit("sendNotificationtoPatient", { patientId, status });
      console.log("Appointment status updated:", response);
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };

  useEffect(() => {
    if (socket && isConnected) {
      socket.on("appointmentStatusUpdated", ({ id, status }) => {
        console.log(status);
        if (id === _id) {
          setAppointments((prevAppointments) => ({
            ...prevAppointments,
            status: status,
          }));
        }
      });
    }
  }, [socket, isConnected, _id]);

  return (
    <div className="bg-white rounded-lg mx-auto w-full md:w-[95%] lg:w-[90%] xl:w-[90%] shadow-md p-4 sm:p-6 mb-4">
    <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
      <div className="flex items-center mb-4 sm:mb-0">
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
      <div className="flex flex-col sm:flex-row items-center">
        <div className="mr-0 sm:mr-8 mb-4 sm:mb-0">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date:
          </label>
          <div className="flex items-center">
            <CalendarOutlined className="h-5 w-5 text-gray-400 mr-2" />
            <span className="border rounded p-2">{appointmentDate}</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time:
          </label>
          <div className="flex items-center">
            <ClockCircleOutlined className="h-5 w-5 text-gray-400 mr-2" />
            <span className="border rounded p-2">{appointmentTime}</span>
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
