import { Link } from 'react-router-dom';
import { UserOutlined, CalendarOutlined, FileOutlined, LineChartOutlined, SettingOutlined } from '@ant-design/icons';

const PatientPageSidebar = () => {
   // Fetch patient data from the backend or use dummy data
   const patient = {
    id: 'id',
    name: 'John Doe',
    age: 35,
    gender: 'Male',
    diagnosis: 'Hypertension',
    // Add more patient details as needed
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Patient Details</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold">{patient.name}</h3>
            <p className="text-gray-600">ID: {patient.id}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 mb-2">Age:</p>
              <p className="font-semibold">{patient.age}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Gender:</p>
              <p className="font-semibold">{patient.gender}</p>
            </div>
          </div>
          <hr className="my-4" />
          <div>
            <p className="text-gray-600 mb-2">Diagnosis:</p>
            <p className="font-semibold">{patient.diagnosis}</p>
          </div>
          {/* Add more patient details */}
        </div>
      </div>
    </div>
  );
};
export default PatientPageSidebar;
