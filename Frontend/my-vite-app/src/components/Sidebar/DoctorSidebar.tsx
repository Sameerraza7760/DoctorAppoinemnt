import {
  CalendarOutlined,
  FileOutlined,
  HomeOutlined,
  LineChartOutlined,
  LogoutOutlined,
  NotificationFilled,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import "./style.css";
const DoctorSidebar = () => {
  const { logout } = useLogout();
  return (
    <div className="bg-DoctorSidebar bg-blue-800 text-center text-white h-screen w-full flex flex-col justify-between">
      <div className="pt-5">
        <h2 className="hidden md:block font-serif text-2xl font-bold mb-6">
          Doctor Dashboard
        </h2>
        <ul className="space-y-3 text-sm md:text-lg">
          <li>
            <Link
              to="/doctor/home"
              className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              <span className="flex items-center  sm:font-medium">
                <HomeOutlined className="mr-2" /> Home
              </span>
              <i className="fas fa-chevron-right"></i>
            </Link>
          </li>
          <li>
            <Link
              to="/doctor/Appoinments"
              className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              <span className="flex items-center  font-medium">
                <CalendarOutlined className="mr-2" /> Appointments
              </span>
              <i className="fas fa-chevron-right"></i>
            </Link>
          </li>
          <li>
            <Link
              to="/doctor/Patients"
              className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              <span className="flex items-center font-medium">
                <UserOutlined className="mr-2" /> Patients
              </span>
              <i className="fas fa-chevron-right"></i>
            </Link>
          </li>
          <li>
            <Link
              to="/prescriptions"
              className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              <span className="flex items-center  font-medium">
                <FileOutlined className="mr-2" /> Prescriptions
              </span>
              <i className="fas fa-chevron-right"></i>
            </Link>
          </li>
          <li>
            <Link
              to="/doctor/Notifications"
              className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              <span className="flex items-center  font-medium">
                <NotificationFilled className="mr-2" /> Notifications
              </span>
              <i className="fas fa-chevron-right"></i>
            </Link>
          </li>
          <li>
            <Link
              to="/reports"
              className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              <span className="flex items-center font-medium">
                <LineChartOutlined className="mr-2" /> Reports
              </span>
              <i className="fas fa-chevron-right"></i>
            </Link>
          </li>
          <li>
            <Link
              to="/doctor/Profile"
              className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              <span className="flex items-center  font-medium">
                <SettingOutlined className="mr-2" /> Settings
              </span>
              <i className="fas fa-chevron-right"></i>
            </Link>
          </li>
          <li onClick={logout}>
            <Link
              to=""
              className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              <span className="flex items-center  font-medium">
                <LogoutOutlined className="mr-2" /> Logout
              </span>
              <i className="fas fa-chevron-right"></i>
            </Link>
          </li>
        </ul>
      </div>
      <div className="p-6">
        <p className="text-sm">&copy; 2024 Your Clinic</p>
      </div>{" "}
    </div>
  );
};

export default DoctorSidebar;
