import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useState } from "react";

const DoctorAppointment = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "John Doe",
      location: "Karachi",
      address: "Karachi Malir B47/8",
      date: "2024-04-20",
      time: "14:30",
      isEditing: false,
    },
  ]);

  const handleDateTimeChange = (id, field, value) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === id ? { ...appointment, [field]: value } : appointment
      )
    );
  };

  const toggleEditMode = (id) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, isEditing: !appointment.isEditing }
          : appointment
      )
    );
  };

  const sendNotification = (patientName) => {
    alert(`Notification sent to ${patientName}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 rounded-lg shadow-md my-4 w-full">
      <h1 className="text-3xl font-bold text-blue-800 mb-8">Appointments</h1>
      {appointments.map((appointment) => (
        <div
          key={appointment.id}
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
              <h2 className="text-xl font-bold text-blue-800">
                {appointment.patientName}
              </h2>
              <p className="text-sm text-green-500">{appointment.location}</p>
              <p className="text-sm text-gray-600">{appointment.address}</p>
            </div>
          </div>
          <div className="flex items-center">
            {appointment.isEditing ? (
              <>
                <div className="relative mr-8">
                  <label
                    htmlFor={`date_${appointment.id}`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Date:
                  </label>
                  <div className="absolute inset-y-0 left-0 flex items-center mt-7 pl-3 pointer-events-none">
                    <CalendarOutlined className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id={`date_${appointment.id}`}
                    value={appointment.date}
                    onChange={(e) =>
                      handleDateTimeChange(
                        appointment.id,
                        "date",
                        e.target.value
                      )
                    }
                    className="border rounded p-2 pl-10 w-32 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor={`time_${appointment.id}`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Time:
                  </label>
                  <div className="absolute inset-y-0 left-0 flex items-center mt-7 pl-3 pointer-events-none">
                    <ClockCircleOutlined className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="time"
                    id={`time_${appointment.id}`}
                    value={appointment.time}
                    onChange={(e) =>
                      handleDateTimeChange(
                        appointment.id,
                        "time",
                        e.target.value
                      )
                    }
                    className="border rounded p-2 pl-10 w-32 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  className="bg-blue-800 text-white px-4 py-2 rounded-md mt-4 ml-auto"
                  onClick={() => toggleEditMode(appointment.id)}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Date: {appointment.date}
                  </p>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Time: {appointment.time}
                  </p>
                </div>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 ml-auto"
                  onClick={() => toggleEditMode(appointment.id)}
                >
                  Edit
                </button>
              </>
            )}
          </div>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
            onClick={() => sendNotification(appointment.patientName)}
          >
            Approved
          </button>
        </div>
      ))}
    </div>
  );
};

export default DoctorAppointment;
