import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import TextInput from "../../components/Inputs/TextInput";
import useConversation from "../../hooks/useConversation";
import { RootState } from "../../store/store";
import { Message } from "../../types/type.Message";
interface PatientChatProps {
  doctorId: string ;
}
function PatientChat({ doctorId }: PatientChatProps) {
  const { sendMessage } = useConversation();
  const { currentUser } = useSelector((state: RootState) => state?.user);
  const [messageContent, setMessageContent] = useState<Message>({
    content: "",
    senderId: currentUser?._id,
    receiverId: doctorId,
    senderType: "Patient",
    receiverType: "Doctor",
  });

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey there! How can I assist you today?",
      sender: "bot",
    },
  ]);

  const handleContentChange = (e: string) => {
    setMessageContent((prevState) => ({
      ...prevState,
      content: e.target.value,
    }));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const url = `/api/v1/message/send/${currentUser?._id}`;
    if (!messageContent.content.trim()) return;
    await sendMessage(url, messageContent);
  };

  return (
    <>
      <div className="bg-gray-100 h-screen flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {/* Chat messages */}
          <div className="flex flex-col space-y-4 p-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "bot" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`${
                    msg.sender === "bot" ? "bg-blue-500" : "bg-green-500"
                  } text-white max-w-xs rounded-lg py-2 px-4`}
                >
                  {msg.text}
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
              value={messageContent.content}
              onChange={handleContentChange}
            />
            <Button
              label="Send"
              type="submit"
              styling="bg-blue-500 text-white rounded-md py-2 px-4 ml-2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default PatientChat;
