import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { z } from "zod";
import { useUserContext } from "../contexts/UserContexts/UserProvider";
import { setCurrentUser } from "../store/auth/authSlice";
type SchemaType = z.ZodObject<any>;
const useLogin = (url: string, Schema: SchemaType) => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const navigate = useNavigate();
  const { userType } = useUserContext();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(Schema),
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
          "User-Type": userType,
        },
      });

      setTimeout(() => {
        navigate(`/${userType}/home`);
      }, 2000);

      dispatch(setCurrentUser(response.data.data));
      localStorage.setItem("accessToken", response.data.data.accessToken);
      addToast("Login successful", {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
    } catch (error: any) {
      addToast(error.message, {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
      console.error("Error registering:", error.message);
    }
  };
  return {
    onSubmit,
    isSubmitting,
    register,
    handleSubmit,
  };
};

export default useLogin;
