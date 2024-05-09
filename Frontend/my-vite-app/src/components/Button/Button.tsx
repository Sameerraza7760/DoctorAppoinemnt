import React from "react";
import { CircularProgress } from "@mui/material";

interface ButtonProps {
  styling: string;
  label: string;
  isSubmitting?: boolean;
  type: "submit" | "reset" | "button";
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  styling,
  label,
  isSubmitting,
  type = "submit",
  onClick,
}) => {
  return (
    <button
      type={type}
      className={styling}
      disabled={isSubmitting}
      onClick={onClick}
    >
      {isSubmitting ? <CircularProgress style={{ color: "white" }} /> : label}
    </button>
  );
};

export default Button;
