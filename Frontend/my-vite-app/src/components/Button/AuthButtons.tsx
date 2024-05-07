import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import useLogout from "../../hooks/useLogout";
function AuthButtons() {
  const { logout } = useLogout();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  return isLoggedIn ? (
    <button
      onClick={logout}
      className="inline-flex ml-5 text-gray-400 border border-gray-700 px-6 outline-4 focus:outline-none rounded"
    >
      Logout
    </button>
  ) : (
    <button
      onClick={() => handleNavigation("/chooseUser")}
      className="inline-flex ml-5 text-gray-400 border border-gray-700 px-6 outline-4 focus:outline-none rounded"
    >
      Login
    </button>
  );
}

export default AuthButtons;
