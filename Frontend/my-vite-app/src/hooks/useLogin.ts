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
  const navigate = useNavigate();
  const { userType } = useUserContext();
  const { addToast } = useToasts();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({ resolver: zodResolver(Schema) });

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
          "User-Type": userType,
        },
      });

      setTimeout(() => {
        if (userType === "patient") {
          navigate("/");
          return;
        }
        navigate("/doctor/home");
      }, 2000);

      const user = response?.data?.data?.user;
      dispatch(setCurrentUser(user));

      localStorage.setItem("accessToken", response.data.data.accessToken);
      addToast("Login successful", {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
    } catch (error: any) {
      if (error) {
        addToast(error.message, {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });
      } else {
        console.error("Error registering:", error);
      }
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
