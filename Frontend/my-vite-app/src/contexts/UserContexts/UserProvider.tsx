import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { UserType } from "../../types/type.Role";
type UserContextProviderProps = { children: React.ReactNode };
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const storedUserType = localStorage.getItem("userType");
  const initialUserType: UserType | null = storedUserType
    ? (storedUserType as UserType)
    : null;

  const [userType, setUserType] = useState<UserType | null>(initialUserType);

  useEffect(() => {
    if (userType) {
      localStorage.setItem("userType", userType);
    } else {
      localStorage.removeItem("userType");
    }
  }, [userType]);

  const value = { userType, setUserType };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
