import { DatePicker, TimePicker } from "antd";
import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import useApiRequests from "../../hooks/useApiRequests";
import { RootState } from "../../store/store";
import { AppointmentRequest } from "../../types/type.AppoinmentRequest";
import { formatDate, formatTime } from "../../utills/formatters";
import Button from "../Button/Button";
import TextInput from "../Inputs/TextInput";
import socket from "../../services/socketService";
import useResourceFetch from "../../hooks/useFetch";
import moment from "moment";

interface CreateAppointmentFormProps {
  doctorId: string;
}

function CreateAppointmentForm({ doctorId }: CreateAppointmentFormProps) {
  const [isTimeAvailable, setIsTimeAvailable] = useState<boolean>(false);
  const { data: doctorAppointments } = useResourceFetch(
    `/api/v1/appointment/getDoctorAppointment/${doctorId}`
  );
  console.log(doctorAppointments);

  const { currentUser } = useSelector((state: RootState) => state?.user);
  const { addToast } = useToasts();
  const { postData, isLoading } = useApiRequests();
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
        console.log("d", appointmentDateTime);

        // Convert both selectedDateTime and appointmentDateTime to timestamps for comparison
        const selectedTimestamp = selectedDateTime.getTime();
        const appointmentTimestamp = appointmentDateTime.getTime();

        return (
          Math.abs(selectedTimestamp - appointmentTimestamp) < 30 * 60 * 1000
        );
      }
    );

    if (overlappingAppointment) {
      addToast(
        "This appointment slot is already booked. Please select another time.",
        {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 3000,
        }
      );
    } else {
      setIsTimeAvailable(true);
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
    }));
  };

  const handleDateChange = (date: string) => {
    setFormData((prevData) => ({
      ...prevData,
      appointmentDate: formatDate(date),
    }));
  };

  const handleTimeChange = (time: string) => {
    setFormData((prevData) => ({
      ...prevData,
      appointmentTime: formatTime(time),
    }));
  };

  const onFinish = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await postData("/api/v1/appointment/createAppointment", formData);

      addToast("Appointment Request Sent", {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
      socket.emit("createAppointment", doctorId);
      setIsTimeAvailable(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <>
      {" "}
      <div>
        <div className="mt-8">
          {" "}
          <TextInput
            name="fullName"
            id="fullName"
            label="Your Name"
            type="text"
            value={formData.fullName}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-8">
          <TextInput
            name="email"
            id="email"
            label="Enter Your Email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-8">
          <TextInput
            name="phoneNumber"
            id="phoneNumber"
            label="Your Phone Number"
            type="number"
            value={formData.phoneNumber as number}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-8">
          <DatePicker style={{ width: "100%" }} onChange={handleDateChange} />
        </div>

        <div className="mt-8">
          {" "}
          <TimePicker style={{ width: "100%" }} onChange={handleTimeChange} />
        </div>
        <div className="mt-8">
          <TextInput
            name="address"
            id="address"
            label="Your address"
            type="text"
            onChange={handleInputChange}
            value={formData.address}
          />
        </div>

        <div style={{ textAlign: "center" }}>
          {isTimeAvailable ? (
            <Button
              label="Create Appointment"
              styling="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
              isSubmitting={isLoading}
              type="submit"
              onClick={onFinish}
            />
          ) : (
            <Button
              label="Check Avaiblity"
              styling="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
              isSubmitting={isLoading}
              type="submit"
              onClick={checkAvailability}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default CreateAppointmentForm;
