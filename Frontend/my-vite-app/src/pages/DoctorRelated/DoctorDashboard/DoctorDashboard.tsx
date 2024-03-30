import DoctorSidebar from "../../../components/Sidebar/DoctorSidebar";
import DoctorAppointment from "../DoctorAppoinment/DoctorAppoinment";
import DoctorHome from "../DoctorHome/DoctorHome";

// import { UserOutlined } from '@ant-design/icons';

// import { UserOutlined } from "@ant-design/icons";

// export default MainContent;

//   export default MainContent;

const DoctorDashboard = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-grow">
        <DoctorSidebar />
        <DoctorHome />
      </div>
    </div>
  );
};

export default DoctorDashboard;
