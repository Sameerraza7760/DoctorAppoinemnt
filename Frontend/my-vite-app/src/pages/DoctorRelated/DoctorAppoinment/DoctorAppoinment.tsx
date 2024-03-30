import {
    UserOutlined
} from "@ant-design/icons";
const DoctorAppointment  = () => {
    return (
      <div className="flex-grow p-4">
        <h2 className="text-3xl font-bold mb-8">Today's Appointments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample appointment cards */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">John Doe</h3>
              <p className="text-gray-600 mb-2">Appointment Time: 10:00 AM</p>
              <p className="text-gray-600 mb-4">Appointment Type: Consultation</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                <UserOutlined /> View Details
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">Jane Smith</h3>
              <p className="text-gray-600 mb-2">Appointment Time: 11:30 AM</p>
              <p className="text-gray-600 mb-4">Appointment Type: Follow-up</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                <UserOutlined /> View Details
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">Michael Johnson</h3>
              <p className="text-gray-600 mb-2">Appointment Time: 2:00 PM</p>
              <p className="text-gray-600 mb-4">Appointment Type: Examination</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                <UserOutlined /> View Details
              </button>
            </div>
          </div>
          {/* Add more appointment cards */}
        </div>
      </div>
    );
  };
  export default DoctorAppointment