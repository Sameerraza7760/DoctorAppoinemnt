import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useConversation from "../../hooks/useConversation";
import { RootState } from "../../store/store";
function DoctorChat() {
  const [patients, setPatients] = useState([]);
  const [messages, setMessages] = useState([]);

  const { _id } = useSelector((state: RootState) => state?.user?.currentUser);
  const { getPatients, getMesseges } = useConversation();
  useEffect(() => {
    const getPatientNames = async () => {
      const data = await getPatients(_id);
      if (!data) return;
      console.log(data);
      setPatients(data);
    };
    getPatientNames();
  }, [_id]);

  const handlePatientClick = (patientId: string) => {
    fetchMessages(patientId);
  };
  const fetchMessages = async (patientId: string) => {
    const messeges = await getMesseges(patientId, _id);

    setMessages(messeges);
  };
  return (
    <div className="flex h-screen">
      <Sidebar patientNames={patients} onPatientClick={handlePatientClick} />
      <ChatArea messages={messages} />
    </div>
  );
}

export default DoctorChat;

interface SidebarProps {
  patientNames: string[];
  onPatientClick: (patientId: string) => void;
}
function Sidebar({ patientNames, onPatientClick }: SidebarProps) {
  return (
    <div className="w-[16%] bg-gray-800 text-white p-4">
      <h2 className="text-2xl mb-4">Patients</h2>
      <ul>
        {patientNames?.map((patient: string) => (
          <li
            key={patient._id}
            onClick={() => onPatientClick(patient._id)}
            className="mb-2 p-2 rounded hover:bg-gray-700 cursor-pointer"
          >
            {patient.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChatArea({
  messages,
}: {
  messages: { _id: string; content: string }[];
}) {
  return (
    <div className="w-3/4 bg-white p-4 flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 border-b border-gray-200">
        {messages?.map((message) => (
          <div key={message._id} className="mb-4">
            <div className="text-gray-700 bg-gray-100 p-2 rounded mb-2">
              <strong>Patient:</strong>
              <p>{message.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Type a message"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
