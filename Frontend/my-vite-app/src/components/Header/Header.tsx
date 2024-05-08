import { MenuOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContexts/UserProvider";
import useToggle from "../../hooks/useToggle";
import { RootState } from "../../store/store";
import AuthButtons from "../Button/AuthButtons";
import "./style.css";

function Header() {
  const { isOpen, toggle, close } = useToggle();

  const { userType } = useUserContext();
  const { isLoggedIn } = useSelector((state: RootState) => state?.user);
  const navigate = useNavigate();

  const navigationItems = [
    { label: "Find Doctors", route: "/doctorsList", active: isLoggedIn },
    { label: "Video Consult", route: "/VideoConsult", active: isLoggedIn },
    { label: "Medicines", route: "/Medicines", active: isLoggedIn },
    { label: "Lab Tests", route: "/LabTests", active: isLoggedIn },
    { label: "Profile Page", route: "/patient-profile", active: isLoggedIn },
  ];

  const handleNavigation = (route: string) => {
    navigate(route);
    close();
  };

  return (
    <header className="text-gray-600 body-font border-b border-gray-300">
      <div
        className={`mx-auto flex justify-between ${
          userType === "doctor" ? "flex-row" : "flex-col"
        } sm:flex-row md:flex-row items-center`}
      >
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img className="headerImage" src="" alt="" />
        </a>
        <nav
          className={`${
            userType === "doctor"
              ? "hidden"
              : "md:mr-auto flex text-sm sm:text-base flex-wrap items-center justify-center ml-9"
          }`}
        >
          {navigationItems?.map(
            (item, index) =>
              item.active && (
                <a
                  key={index}
                  className="mr-5 hover:text-gray-900 font-bold cursor-pointer"
                  onClick={() => handleNavigation(item.route)}
                >
                  {item.label}
                </a>
              )
          )}
        </nav>
        <nav className="md:ml-auto flex flex-wrap items-center text-base ml-9">
          <ul className="loginpart flex">
            <li className="mr-6">
              <a href="#" className="hover:text-gray-900">
                For Corporates
              </a>
            </li>
            <li className="mr-6">
              <a href="#" className="hover:text-gray-900">
                For Providers
              </a>
            </li>
            <li className="mr-6">
              <a href="#" className="hover:text-gray-900">
                Security
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900">
                Help
              </a>
            </li>
            <li>
              {" "}
              <AuthButtons handleNavigation={handleNavigation} />
            </li>
          </ul>
          <div className="loginHamBurger px-4 py-2">
            <button
              onClick={toggle}
              className="px-3  py-2 text-black rounded-md"
            >
              <MenuOutlined />
            </button>{" "}
            {isOpen && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-lg z-10">
                <ul className="divide-y divide-gray-200">
                  {navigationItems.map(
                    (item, index) =>
                      item.active && (
                        <li key={index} className="px-4 py-2">
                          <a
                            href="#"
                            className="hover:text-gray-900"
                            onClick={() => handleNavigation(item.route)}
                          >
                            {item.label}
                          </a>
                        </li>
                      )
                  )}
                  <li className="px-4 py-2">
                    {" "}
                    <AuthButtons handleNavigation={handleNavigation} />
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
