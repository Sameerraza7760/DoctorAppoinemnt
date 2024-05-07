import { CalendarOutlined, UserOutlined } from "@ant-design/icons";

const PatientPageSidebar = () => {
  const patient = {
    id: "id",
    name: "John Doe",
    age: 35,
    gender: "Male",
    diagnosis: "Hypertension",
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Patient Details</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-blue-600">
              {patient.name}
            </h3>
            <p className="text-gray-600">ID: {patient.id}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <UserOutlined className="text-blue-500 mr-2" />
              <p className="text-gray-600 mb-2">Age:</p>
              <p className="font-semibold">{patient.age}</p>
            </div>
            <div className="flex items-center">
              <UserOutlined className="text-blue-500 mr-2" />
              <p className="text-gray-600 mb-2">Gender:</p>
              <p className="font-semibold">{patient.gender}</p>
            </div>
          </div>
          <hr className="my-4" />
          <div className="flex items-center">
            <CalendarOutlined className="text-blue-500 mr-2" />
            <p className="text-gray-600 mb-2">Diagnosis:</p>
            <p className="font-semibold">{patient.diagnosis}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientPageSidebar;
