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
      const accessToken = localStorage.getItem("accessToken");
      await axios.post(
        "/api/v1/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "User-Type": userType,
          },
        }
      );
      dispatch(removeCurrentUser());
      addToast("Logout successful", {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
      localStorage.removeItem("accessToken");
      navigate("/");
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
