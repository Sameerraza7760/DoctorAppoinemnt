import { useState } from "react";
import { useUserContext } from "../contexts/UserContexts/UserProvider";
import axios from "axios";

const useApiRequests = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { userType } = useUserContext();
  const accessToken = localStorage.getItem("accessToken");

  const postData = async (url: string, data: unknown) => {
    setIsLoading(true);

    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
          "User-Type": userType,
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setIsLoading(false);
      return response.data;
    } catch (error) {
      setIsLoading(false);
      console.error("Error:", error);
    }
  };
  const putData = async (url: string, data: unknown) => {
    setIsLoading(true);

    try {
      const response = await axios.put(url, data, {
        headers: {
          "Content-Type": "application/json",
          "User-Type": userType,
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setIsLoading(false);
      return response.data;
    } catch (error) {
      setIsLoading(false);
      console.error("Error:", error);
    }
  };

  return { isLoading, postData, putData };
};

export default useApiRequests;
