import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useUserContext } from "../contexts/UserContexts/UserProvider";
import { useNavigate } from "react-router-dom";

type SchemaType = z.ZodObject<any>;
const useRegistration = (url: string, Schema: SchemaType) => {
  const navigate = useNavigate();
  const { userType } = useUserContext();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(Schema),
  });
  const [showToast, setShowToast] = useState(false);
  const [serverError, setServerError] = useState<string | undefined>();
  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
          "User-Type": userType,
        },
      });
      setShowToast(true);
      navigate("/login");
      console.log("Registration successful", response.data);
    } catch (error: any) {
      setServerError(error.message);
      setTimeout(() => {
        setServerError("");
      }, 2000);
      console.error("Error registering:", error.message);
    }
  };
  return {
    onSubmit,
    showToast,
    serverError,
    isSubmitting,
    register,
    handleSubmit,
  };
};

export default useRegistration;
