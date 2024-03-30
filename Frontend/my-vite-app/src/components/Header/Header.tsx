import axios from "axios";
import "./../style.css";
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const accsessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accsessToken}`,
          },
        }
      );
      console.log(response.data);
      alert("Logout successful");
      localStorage.removeItem("accessToken");
    } catch (error: any) {
      console.error("Error logging out:", error.message);
      alert("Logout failed");
    }
  };
  return (
    <header className="text-gray-600 body-font border-b border-gray-300">
      <div className="container mx-auto flex flex-wrap p-1 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img className="headerImage" src="" alt="" />
        </a>
        <nav className="md:mr-auto flex flex-wrap items-center text-base justify-center ml-9">
          <a className="mr-5 hover:text-gray-900 font-bold">Find Doctors</a>
          <a className="mr-5 hover:text-gray-900 font-bold">Video Consult</a>
          <a className="mr-5 hover:text-gray-900 font-bold">Medicines</a>
          <a className="mr-5 hover:text-gray-900 font-bold">Lab Tests</a>
        </nav>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center ml-9">
          <ul className="flex">
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
            <button onClick={handleLogout}
              // onClick={() => navigate("/chooseUser")}
              className="inline-flex ml-5 text-gray-400 border border-gray-700 px-6 outline-4 focus:outline-none rounded"
            >
              Login
            </button>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
