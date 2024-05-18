import axios from "axios";
import { useUserContext } from "../contexts/UserContexts/UserProvider";

const useConversation = () => {
  const { userType } = useUserContext();
  const accessToken = localStorage.getItem("accessToken");

  const sendMessage = async (url: string, data: unknown) => {
    try {
      const response = await axios.post(url, data, {
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
  const getPatients = async (doctorId: string) => {
    try {
      const response = await axios.get(" /api/v1/message/getPatientNames", {
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

  const getMesseges = async (patientId: string, doctorId: string) => {
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
  return { sendMessage, getPatients, getMesseges };
};

export default useConversation;
