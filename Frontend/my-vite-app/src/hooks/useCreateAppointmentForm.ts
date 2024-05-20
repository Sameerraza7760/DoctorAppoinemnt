import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { formatDate, formatTime } from "../../src/utills/formatters";
import { RootState } from "../store/store";
import { AppointmentRequest } from "../types/type.AppoinmentRequest";
import useApiRequests from "./useApiRequests";
import useResourceFetch from "./useFetch";
import useSocket from "./useSocket";
const useCreateAppointmentForm = (doctorId: string) => {
  const { socket } = useSocket();
  const [isTimeAvailable, setIsTimeAvailable] = useState<boolean>(false);
  const { data: doctorAppointments } = useResourceFetch(
    `/api/v1/appointment/getDoctorAppointment/${doctorId}`
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { currentUser } = useSelector((state: RootState) => state?.user);

  const { postData } = useApiRequests();
  const [formData, setFormData] = useState<AppointmentRequest>({
    doctorId: doctorId,
    fullName: "",
    email: "",
    phoneNumber: 0,
    patientId: currentUser?._id,
    appointmentDate: "",
    appointmentTime: "",
    status: "Pending",
  });
  const checkAvailability = () => {
    const selectedDateTime = new Date(
      `${formData.appointmentDate} ${formData.appointmentTime}`
    );

    const overlappingAppointment = doctorAppointments?.data?.find(
      (appointment: AppointmentRequest) => {
        const appointmentDateTime = new Date(
          `${appointment.appointmentDate} ${appointment.appointmentTime}`
        );

        const selectedTimestamp = selectedDateTime.getTime();
        const appointmentTimestamp = appointmentDateTime.getTime();
        return (
          Math.abs(selectedTimestamp - appointmentTimestamp) < 30 * 60 * 1000
        );
      }
    );

    if (overlappingAppointment) {
      toast.error(
        "This appointment slot is already booked. Please select another time.",
        {
          autoClose: 3000,
        }
      );
    } else {
      setIsTimeAvailable(true);
      toast.dark("Doctor Availible this time you can Sent Appointment ", {
        autoClose: 3000,
      });
    }

    //The logical NOT operator ! negates the value of overlappingAppointment.
    // So, if overlappingAppointment is undefined, !overlappingAppointment evaluates
    //to true. If overlappingAppointment contains an appointment object, !overlappingAppointment
    // evaluates to false.
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      patientId: currentUser?._id,
    }));
  };

  const handleDateChange = (date: string) => {
    setFormData((prevData) => ({
      ...prevData,
      appointmentDate: formatDate(date),
    }));
  };

  const handleTimeChange = (time: any) => {
    setFormData((prevData) => ({
      ...prevData,
      appointmentTime: formatTime(time),
    }));
  };
  const onFinish = async () => {
    try {
      setIsLoading(true);
      const response = await postData(
        "/api/v1/appointment/createAppointment",
        formData
      );

      if (!response) {
        toast.error("Failed to send appointment request", {
          autoClose: 3000,
        });
        setIsLoading(false);
        return;
      }

      toast.success("Appointment Request Sent", {
        autoClose: 3000,
      });

      if (socket) {
        socket.emit("createAppointment", {
          doctorId,
          patientId: currentUser?._id,
        });
      } else {
        console.warn("Socket is not defined");
      }

      setIsTimeAvailable(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form", {
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isTimeAvailable,
    formData,
    handleInputChange,
    handleDateChange,
    handleTimeChange,
    onFinish,
    checkAvailability,
    isLoading,
  };
};

export default useCreateAppointmentForm;
