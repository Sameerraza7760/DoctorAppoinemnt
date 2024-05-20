import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../../components/Button/Button";
import TextInput from "../../../components/Inputs/TextInput";
import useConversation from "../../../hooks/useConversation";
import { RootState } from "../../../store/store";
import { Message } from "../../../types/type.Message";
import useSocket from "../../../hooks/useSocket";
interface PatientChatProps {
  doctorId: string;
}
function PatientChat({ doctorId }: PatientChatProps) {
  const { isConnected, socket } = useSocket();
  const { sendMessage, getMessages } = useConversation();
  const [messageList, setMessageList] = useState<Message[]>([]);
  const { currentUser } = useSelector((state: RootState) => state?.user);
  const [messageContent, setMessageContent] = useState<Message>({
    message: "",
    patientId: currentUser?._id,
    doctorId: doctorId,
    senderId: currentUser?._id,
    timestamp: new Date().toISOString(),
  });

  useEffect(() => {
    if (socket && isConnected) {
      console.log("Socket connected:", socket.connected);

      socket.on("messegeRecieved", (msg) => {
        if (doctorId === msg.doctorId && currentUser?._id === msg.patientId) {
          console.log("messegeRecieved:", msg);
          setMessageList((prevMsg) => [...prevMsg, msg]);
        }
      });
    }
  }, [socket, isConnected]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!currentUser?._id) return;
      const messages = await getMessages(currentUser._id, doctorId);
      if (messages) setMessageList(messages);
    };
    fetchMessages();
  }, []);

  const handleContentChange = (e: any) => {
    setMessageContent((prevState) => ({
      ...prevState,
      message: e.target.value,
    }));
  };

  const handleSendMessage = async (e: any) => {
    e.preventDefault();

    if (!messageContent.message.trim()) return;
    await sendMessage(messageContent);
  };

  return (
    <>
      <div className="bg-gray-100 h-screen flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {/* Chat messages */}
          <div
            className="flex flex-col space-y-4 p-4"
            style={{ width: "90%", maxWidth: "90%" }}
          >
            {messageList.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.senderId === "bot" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`${
                    msg.senderId === currentUser?._id
                      ? "bg-blue-500 self-end w-[20%]"
                      : "bg-green-500 self-start  w-[20%]"
                  } text-white max-w-md rounded-lg py-2 px-4`}
                >
                  {msg.message}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Input area */}
        <form onSubmit={handleSendMessage}>
          <div className="bg-white p-4 border-t flex items-center">
            <TextInput
              name="message"
              id="message"
              label="Enter a Message ..."
              type="text"
              value={messageContent.message}
              onChange={handleContentChange}
            />
            <Button
              label="Send"
              type="submit"
              styling="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default PatientChat;
