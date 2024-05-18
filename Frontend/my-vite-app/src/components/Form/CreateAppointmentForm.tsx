import { DatePicker, TimePicker } from "antd";
import Button from "../Button/Button";
import TextInput from "../Inputs/TextInput";
import useCreateAppointmentForm from "../../hooks/useCreateAppointmentForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface CreateAppointmentFormProps {
  doctorId: string;
}

function CreateAppointmentForm({ doctorId }: CreateAppointmentFormProps) {
  const {
    formData,
    handleDateChange,
    handleTimeChange,
    handleInputChange,
    isTimeAvailable,
    checkAvailability,
    onFinish,
    isLoading,
  } = useCreateAppointmentForm(doctorId);

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
        </div>{" "}
        <ToastContainer />
      </div>
    </>
  );
}

export default CreateAppointmentForm;
