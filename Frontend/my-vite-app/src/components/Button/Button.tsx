import React from "react";
import { CircularProgress } from "@mui/material";

interface ButtonProps {
  styling: string;
  label: string;
  isSubmitting: boolean;
}
const Button: React.FC<ButtonProps> = ({ styling, label, isSubmitting }) => {
  return (
    <button type="submit" className={styling} disabled={isSubmitting}>
      {isSubmitting ? <CircularProgress style={{ color: "white" }} /> : label}
    </button>
  );
};

export default Button;
