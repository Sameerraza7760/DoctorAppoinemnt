import { MenuOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContexts/UserProvider";
import useToggle from "../../hooks/useToggle";
import "./style.css";
function Header() {
  const { isOpen, toggle } = useToggle();
  const { userType } = useUserContext();
  const currentUser = useSelector((state: any) => state.user);
  console.log("v", currentUser);
  const navigate = useNavigate();


  return (
    <header className="text-gray-600 body-font border-b border-gray-300">
      <div
        className={` mx-auto flex justify-between  ${
          userType === "doctor" ? "flex-row" : "flex-col"
        } sm:flex-row   md:flex-row items-center`}
      >
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img className="headerImage" src="" alt="" />
        </a>
        <nav
          className={`${
            userType === "doctor"
              ? "hidden"
              : " md:mr-auto flex text-sm sm:text-base flex-wrap items-center justify-center ml-9"
          } `}
        >
          <a
            className="mr-5 hover:text-gray-900 font-bold cursor-pointer"
            onClick={() => navigate("/doctorsList")}
          >
            Find Doctors
          </a>
          <a className="mr-5 hover:text-gray-900 font-bold">Video Consult</a>
          <a className="mr-5 hover:text-gray-900 font-bold">Medicines</a>
          <a className="mr-5 hover:text-gray-900 font-bold">Lab Tests</a>
        </nav>
        <nav className="md:ml-auto flex flex-wrap items-center text-base  ml-9">
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
            </li>{" "}
            <button
              // onClick={logout}
              onClick={() => navigate("/chooseUser")}
              className="inline-flex ml-5 text-gray-400 border border-gray-700 px-6 outline-4 focus:outline-none rounded"
            >
              Login
            </button>{" "}
          </ul>{" "}
          <div className="loginHamBurger px-4 py-2">
            <button
              onClick={toggle}
              className=" px-3  py-2 text-black rounded-md"
            >
              <MenuOutlined />
            </button>{" "}
            {isOpen && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-lg z-10">
                <ul className="divide-y divide-gray-200">
                  <li className="px-4 py-2">
                    <a href="#" className="hover:text-gray-900">
                      For Corporates
                    </a>
                  </li>
                  <li className="px-4 py-2">
                    <a href="#" className="hover:text-gray-900">
                      For Providers
                    </a>
                  </li>
                  <li className="px-4 py-2">
                    <a href="#" className="hover:text-gray-900">
                      Security
                    </a>
                  </li>
                  <li className="px-4 py-2">
                    <a href="#" className="hover:text-gray-900">
                      Help
                    </a>
                  </li>
                  <li className="px-4 py-2">
                    <button
                      // onClick={logout}
                      onClick={() => navigate("/chooseUser")}
                      className="text-gray-400 border border-gray-700 px-6 outline-4 focus:outline-none rounded"
                    >
                      Login
                    </button>
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
