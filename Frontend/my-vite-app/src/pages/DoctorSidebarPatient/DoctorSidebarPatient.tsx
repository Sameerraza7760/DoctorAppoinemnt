import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Input, List, Typography } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
const { Search } = Input;
const { Text } = Typography;

function DoctorSidebarPatient() {
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "John Doe",
      age: 35,
      gender: "Male", 
      imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 28,
      gender: "Female",
      imageUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    // Add more patient data as needed
  ]);

  const handleSearch = (value:any) => {
    // Implement search logic here
    // Example: Filter patients whose name contains the search value
    const filteredPatients = patients.filter((patient) =>
      patient.name.toLowerCase().includes(value.toLowerCase())
    );
    setPatients(filteredPatients);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8 ">
        <div className="flex justify-between items-center mb-8">
          <Typography.Title level={2} className="text-2xl font-semibold text-gray-800">
            Patient List
          </Typography.Title>
          <Search
            placeholder="Search patients"
            onSearch={handleSearch}
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
            className="ml-auto"
          />
        </div>
        <List
          itemLayout="horizontal"
          dataSource={patients}
          renderItem={(patient) => (
            <List.Item className="bg-white rounded-lg shadow-md p-4 mb-4">
              <div className="flex items-center">
                <Avatar
                  src={patient.imageUrl}
                  icon={<UserOutlined />}
                  className="mr-4"
                />
                <div>
                  <Link
                    to={`/patient-profile/${patient.id}`}
                    className="font-semibold text-gray-900 hover:underline"
                  >
                    {patient.name}
                  </Link>
                  <div className="flex mt-1">
                    <Text type="secondary" className="mr-4">
                      Age: {patient.age}
                    </Text>
                    <Text type="secondary">Gender: {patient.gender}</Text>
                  </div>
                </div>
              </div>
              <div className="ml-auto">
                <Link
                  to={`/patient-profile/${patient.id}`}
                  className="text-blue-500 hover:underline"
                >
                  View Profile
                </Link>
                {/* Add more action buttons as needed */}
              </div>
            </List.Item>
          )}
        />
      </div>
    </>
  );
}

export default DoctorSidebarPatient;
