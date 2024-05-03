import { useState } from "react";
import { useUserContext } from "../contexts/UserContexts/UserProvider";
import axios from "axios";
const usePostData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { userType } = useUserContext();
  const accsessToken = localStorage.getItem("accessToken");
  const postData = async (url: string, data: unknown) => {
    setIsLoading(true);
  
    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
          "User-Type": userType,
          Authorization: `Bearer ${accsessToken}`,
        },
      });
      setIsLoading(false);
      return await response.data();
    } catch (error) {
      setIsLoading(false);
    }
  };

  return { isLoading, postData };
};

export default usePostData;
