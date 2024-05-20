import axios from "axios";
import { useUserContext } from "../contexts/UserContexts/UserProvider";
import useSocket from "./useSocket";
const useConversation = () => {
  const { socket } = useSocket();
  const { userType } = useUserContext();
  const accessToken = localStorage.getItem("accessToken");

  const sendMessage = async (data: unknown) => {
    try {
      const response = await axios.post("/api/v1/message/sendMessege", data, {
        headers: {
          "Content-Type": "application/json",
          "User-Type": userType,
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Messege Sent");
      socket?.emit("messegeSent", data);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const getPatients = async (doctorId: string | undefined) => {
    try {
      const response = await axios.get("/api/v1/message/getPatientNames", {
        params: { doctorId },
        headers: {
          "Content-Type": "application/json",
          "User-Type": userType,
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getMessages = async (
    patientId: string,
    doctorId: string | undefined
  ) => {
    try {
      const response = await axios.get("/api/v1/message/getMessages", {
        params: { doctorId, patientId },
        headers: {
          "Content-Type": "application/json",
          "User-Type": userType,
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return { sendMessage, getPatients, getMessages };
};

export default useConversation;
