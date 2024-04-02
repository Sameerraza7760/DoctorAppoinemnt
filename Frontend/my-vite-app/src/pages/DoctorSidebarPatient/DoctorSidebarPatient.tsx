import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, List, Input, Typography, Space } from "antd";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";
import DoctorSidebar from "../../components/Sidebar/DoctorSidebar";
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

  const handleSearch = (value) => {
    // Implement search logic here
    // Example: Filter patients whose name contains the search value
    const filteredPatients = patients.filter((patient) =>
      patient.name.toLowerCase().includes(value.toLowerCase())
    );
    setPatients(filteredPatients);
  };

  return (
    <>
      <div className="container w-full mx-auto">
        <div className="header">
          <Typography.Title
            level={2}
            style={{ marginBottom: 16, color: "#1890ff" }}
          >
            Patient List
          </Typography.Title>
          <Search
            placeholder="Search patients"
            onSearch={handleSearch}
            prefix={<SearchOutlined style={{ color: "#1890ff" }} />}
            style={{ width: 300 }}
          />
        </div>
        <List
          itemLayout="horizontal"
          dataSource={patients}
          renderItem={(patient) => (
            <List.Item className="patient-item">
              <List.Item.Meta
                avatar={
                  <Avatar src={patient.imageUrl} icon={<UserOutlined />} />
                }
                title={
                  <Link
                    to={`/patient-profile/${patient.id}`}
                    style={{ fontWeight: "bold", color: "#1890ff" }}
                  >
                    {patient.name}
                  </Link>
                }
                description={
                  <Space size="small">
                    <Text type="secondary">Age: {patient.age}</Text>
                    <Text type="secondary">Gender: {patient.gender}</Text>
                  </Space>
                }
              />
              <div className="action-buttons">
                <Link
                  to={`/patient-profile/${patient.id}`}
                  className="view-profile-btn"
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
