import { useSelector } from "react-redux";
import useLogout from "../../hooks/useLogout";
import { RootState } from "../../store/store";
import Button from "./Button";
interface AuthButtonsProps {
  handleNavigation: (route: string) => void;
}
function AuthButtons({ handleNavigation }: AuthButtonsProps) {
  const { logout } = useLogout();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  return isLoggedIn ? (
    <Button
      onClick={logout}
      label="Logout"
      styling="inline-flex ml-5 text-gray-400 border border-gray-700 px-6 outline-4 focus:outline-none rounded"
      isSubmitting={false}
      type="button"
    />
  ) : (
    <Button
      onClick={() => handleNavigation("/chooseUser")}
      label="Login"
      styling="inline-flex ml-5 text-gray-400 border border-gray-700 px-6 outline-4 focus:outline-none rounded"
      isSubmitting={false}
      type="button"
    />
  );
}

export default AuthButtons;
