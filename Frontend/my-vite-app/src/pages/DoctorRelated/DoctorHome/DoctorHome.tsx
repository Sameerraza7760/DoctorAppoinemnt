import { MessageOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AlertNotification from "../../../components/Toast/AlertNotification";
import useSocket from "../../../hooks/useSocket";
import useToggle from "../../../hooks/useToggle";
import { RootState } from "../../../store/store";
import "./style.css";
function DoctorHome() {
  const navigate = useNavigate();
  const { socket, isConnected } = useSocket();
  const { currentUser } = useSelector((state: RootState) => state?.user);

  const { close } = useToggle();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const appointmentSummary = 25;
  const patientStatistics = 150;

  const upcomingTasks = [
    { id: 1, title: "Review patient reports", time: "9:00 AM" },
    { id: 2, title: "Consultation with Mr. Smith", time: "10:30 AM" },
    { id: 3, title: "Follow-up call with Ms. Johnson", time: "2:00 PM" },
  ];
  const handleNotification = ({
    doctorId,
    message,
  }: {
    doctorId: string;
    message: string;
  }) => {
    console.log("Received notification:", { doctorId, message });

    if (doctorId === currentUser?._id) {
      setNotificationMessage(message);
      setIsVisible(true);
    }
  };
  useEffect(() => {
    console.log("Socket connection status:", isConnected);

    if (isConnected === true && currentUser?._id) {
      console.log("Setting up socket listener for notifications");

      socket?.on("notificationSendToTheDoctor", handleNotification);

      return () => {
        console.log("Cleaning up socket listener");
        socket?.off("notificationSendToTheDoctor", handleNotification);
      };
    }
  }, [isConnected, socket]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <>
      {" "}
      {isVisible && (
        <AlertNotification
          type="success"
          message={notificationMessage}
          onClose={close}
        />
      )}
      <div className="container mx-auto py-8 w-full">
        {" "}
        <div className="flex justify-between items-center p-4">
          <div className="flex-1 flex justify-center">
            <h2 className="text-3xl text-center font-serif font-semibold mb-4 text-blue-800">
              Doctor Dashboard
            </h2>
          </div>
          <div
            className="flex justify-end w-[10%] cursor-pointer p-5"
            onClick={() => navigate("/doctor/ChatRoom")}
          >
            <MessageOutlined
              style={{
                color: "blue",
                marginRight: "8px",
                fontSize: "24px",
              }}
            />
          </div>
        </div>
        <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Appointment Summary */}
          <div className="appoinment bg-white cursor-pointer p-6 rounded-md shadow-md transition duration-300 transform hover:scale-105 hover:bg-gray-100">
            <h3 className="text-2xl text-white font-semibold mb-2">
              Appointment Summary
            </h3>
            <p className="text-white-600">
              {appointmentSummary} appointments scheduled
            </p>
          </div>

          <div className="bg-doctor-Statistics cursor-pointer bg-white p-6 rounded-md shadow-md transition duration-300 transform hover:scale-105 hover:bg-gray-100">
            <h3 className="text-2xl font-semibold mb-2 text-white ">
              Patient Statistics
            </h3>
            <p className="text-white">
              {patientStatistics} patients in the system
            </p>
          </div>

          <div className="upcommingTask cursor-pointer bg-white p-6 rounded-md shadow-md transition duration-300 transform hover:scale-105 hover:bg-gray-100">
            <h3 className="text-lg font-semibold mb-2 text-white">
              Upcoming Tasks
            </h3>
            <ul className="space-y-2">
              {upcomingTasks?.map((task) => (
                <li key={task.id}>
                  <span className="text-white font-semibold">{task.title}</span>
                  <span className="text-white blue-600 ml-2">{task.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorHome;
