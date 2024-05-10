import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { currentUser } = useSelector((state: RootState) => state?.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/chooseUser", { replace: true });
    }
    return;
  }, [currentUser]);

  return currentUser ? children : null;
}
