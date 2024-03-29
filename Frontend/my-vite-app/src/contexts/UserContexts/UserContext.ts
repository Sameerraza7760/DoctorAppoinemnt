import React, { createContext } from "react";
import { UserType } from "../../types/type.Role";

export type UserContextType = {
  userType: UserType | null;
  setUserType: React.Dispatch<React.SetStateAction<UserType | null>>;
};

export const UserContext = createContext<UserContextType | null>(
  null
);
