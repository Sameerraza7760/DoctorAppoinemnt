import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContexts/UserProvider";
import { useToasts } from "react-toast-notifications";
import { useDispatch } from "react-redux";
import { removeCurrentUser } from "../store/auth/authSlice";
const useLogout = () => {
  const dispatch = useDispatch();
  const { userType } = useUserContext();
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const logout = async () => {
    try {
      const accsessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        "http://localhost:8001/api/v1/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accsessToken}`,
            "User-Type": userType,
          },
        }
      );
      addToast("Logout successful", {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
      dispatch(removeCurrentUser());
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
