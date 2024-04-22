import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useUserContext } from "../contexts/UserContexts/UserProvider";
import { doctorSchema } from "../zodSchema/docterRegistered.Scheme";
import { patientSchema } from "../zodSchema/patientRegistered.Schema";

const useRegistration = (url: string) => {
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const { userType } = useUserContext();
  const {
    register,
    handleSubmit,control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(userType === "doctor" ? doctorSchema : patientSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try { console.log(data.startTiming);
    
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
          "User-Type": userType,
        },
      });
      addToast("Registration successful", {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
      navigate("/login");
      console.log("Registration successful", response.data);
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
    errors,control
  };
};

export default useRegistration;
