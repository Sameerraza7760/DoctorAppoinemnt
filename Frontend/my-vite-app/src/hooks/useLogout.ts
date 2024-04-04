import axios from "axios";
import { useState } from "react";
import { useUserContext } from "../contexts/UserContexts/UserProvider";
import { useNavigate } from "react-router-dom";
// import { useToast } from "@chakra-ui/react";
const useLogout = () => {
  const [showToast, setShowToast] = useState(false);
  const [serverError, setServerError] = useState<string | undefined>();
  //   const toast = useToast();
  const { userType } = useUserContext();
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const accsessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accsessToken}`,
            "User-Type": userType,
          },
        }
      );
      console.log(response.data);
      // Show success toast
      // toast({
      //     title: "Logout Successful",
      //     status: "success",
      //     duration: 3000,
      //     isClosable: true,
      //   });
      setShowToast(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);

      localStorage.removeItem("accessToken");
    } catch (error: any) {
      console.error("Error logging out:", error.message);
      setServerError("Logout failed");

      // Show error toast
      //   toast({
      //     title: "Logout Failed",
      //     description: "An error occurred while logging out.",
      //     status: "error",
      //     duration: 3000,
      //     isClosable: true,
      //   });
    }
  };
  return { logout, serverError, showToast };
};

export default useLogout;
