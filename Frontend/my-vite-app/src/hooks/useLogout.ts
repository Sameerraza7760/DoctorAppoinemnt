import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContexts/UserProvider";
import { useToasts } from "react-toast-notifications";
const useLogout = () => {
  const { userType } = useUserContext();
  const navigate = useNavigate();
  const { addToast } = useToasts();
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
      addToast("Logout successful", {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
      localStorage.removeItem("accessToken");
    } catch (error: any) {
      addToast(error.message, {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
    }
  };
  return { logout };
};

export default useLogout;
