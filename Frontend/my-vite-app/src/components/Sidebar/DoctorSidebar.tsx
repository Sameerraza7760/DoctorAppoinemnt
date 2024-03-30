import { Link } from 'react-router-dom';
import { CalendarOutlined, UserOutlined, FileOutlined, LineChartOutlined, SettingOutlined } from '@ant-design/icons';

const DoctorSidebar = () => {
  return (
    <div className="bg-blue-800 text-white h-screen w-64 flex flex-col justify-between">
      <div className="p-6">
        <h2 className="text-2xl text-center font-serif font-bold mb-6">Doctor Dashboard</h2>
        <ul className="space-y-3">
          <li>
            <Link to="/appointments" className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
              <span className="flex items-center text-lg font-medium">
                <CalendarOutlined className="mr-2" /> Appointments
              </span>
              <i className="fas fa-chevron-right"></i>
            </Link>
          </li>
          <li>
            <Link to="/patients" className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
              <span className="flex items-center text-lg font-medium">
                <UserOutlined className="mr-2" /> Patients
              </span>
              <i className="fas fa-chevron-right"></i>
            </Link>
          </li>
          <li>
            <Link to="/prescriptions" className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
              <span className="flex items-center text-lg font-medium">
                <FileOutlined className="mr-2" /> Prescriptions
              </span>
              <i className="fas fa-chevron-right"></i>
            </Link>
          </li>
          <li>
            <Link to="/reports" className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
              <span className="flex items-center text-lg font-medium">
                <LineChartOutlined className="mr-2" /> Reports
              </span>
              <i className="fas fa-chevron-right"></i>
            </Link>
          </li>
          <li>
            <Link to="/settings" className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
              <span className="flex items-center text-lg font-medium">
                <SettingOutlined className="mr-2" /> Settings
              </span>
              <i className="fas fa-chevron-right"></i>
            </Link>
          </li>
        </ul>
      </div>
      <div className="p-6">
        <p className="text-sm">&copy; 2024 Your Clinic</p>
      </div>
    </div>
  );
};

export default DoctorSidebar;
