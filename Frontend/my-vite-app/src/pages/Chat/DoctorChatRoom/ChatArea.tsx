import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import Button from "../../../components/Button/Button";
import useConversation from "../../../hooks/useConversation";
import { Message } from "../../../types/type.Message";

interface ChatAreaProps {
  messages: Message[];
  activePatientId: string;
}

function ChatArea({ messages, activePatientId }: ChatAreaProps) {
  const { currentUser } = useSelector((state: RootState) => state.user);
  if (!currentUser?._id) return;
  const { sendMessage } = useConversation();

  const [messageContent, setMessageContent] = useState<string>("");

  const handleSendMessage = async () => {
    if (!messageContent.trim()) return;

    const newMessage: Message = {
      message: messageContent,
      patientId: activePatientId,
      doctorId: currentUser._id,
      senderId: currentUser._id,
      timestamp: new Date().toISOString(),
    };
    await sendMessage(newMessage);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageContent(e.target.value);
  };

  return (
    <div className="chatArea w-3/4 bg-white p-4 flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 border-b border-gray-200">
        {messages.map((message: Message, index) => (
          <div key={index} className="mb-4">
            <div
              className={`p-2 rounded mb-2 ${
                message.senderId === currentUser._id
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              <div>
                <strong>
                  {message.senderId === currentUser._id ? "Doctor" : "Patient"}:
                </strong>
                <p>{message.message}</p>
              </div>
              <div>
                <p>{new Date(message.timestamp).toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="messageInput mt-4 p-4 border-t border-gray-200 flex">
        <input
          value={messageContent}
          type="text"
          placeholder="Type a message"
          onChange={handleContentChange}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          onClick={handleSendMessage}
          type="button" 
          styling="bg-blue-500 text-white rounded-md py-2 px-4 ml-2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          label="Send"
        />
      </div>
    </div>
  );
}

export default ChatArea;
