import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useConversation from "../../../hooks/useConversation";
import { RootState } from "../../../store/store";
import "./../style.css";
import ChatArea from "./ChatArea";
import SidebarPatients, { Patient } from "./SidebarPatients";
import { Message } from "../../../types/type.Message";
import useSocket from "../../../hooks/useSocket";
function DoctorChat() {
  const { socket, isConnected } = useSocket();
  const [patientList, setPatientList] = useState<Patient[]>([]);
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [activePatientId, setActivePatientId] = useState<string>("");
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { getPatients, getMessages } = useConversation();

  useEffect(() => {
    const fetchPatients = async () => {
      if (!currentUser?._id) return;
      const patients = await getPatients(currentUser._id);
      if (patients) setPatientList(patients);
    };

    fetchPatients();
  }, [currentUser, getPatients]);
  
  useEffect(() => {
    if (socket && isConnected) {
      console.log("Socket connected:", socket.connected);

      socket.on("messegeRecieved", (msg) => {
        console.log(msg);
        if (currentUser?._id === msg.senderId) {
          console.log("messegeRecieved:", msg);
          setMessageList((prevMsg) => [...prevMsg, msg]);
        }
      });
    }
  }, [socket, isConnected]);

  const handlePatientSelection = async (patientId: string) => {
    setActivePatientId(patientId);
    const messages = await getMessages(patientId,currentUser?._id);
    if (messages) setMessageList(messages);
  };

  return (
    <div className="chatRoom flex h-screen">
      <SidebarPatients
        patients={patientList}
        onPatientSelect={handlePatientSelection}
      />
      <ChatArea activePatientId={activePatientId} messages={messageList} />
    </div>
  );
}

export default DoctorChat;
