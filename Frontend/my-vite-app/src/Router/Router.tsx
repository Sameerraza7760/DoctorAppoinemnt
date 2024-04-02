import { Route, Routes } from "react-router-dom";
import ChooseUser from "../pages/ChooseUser/ChooseUser";
import DocterRegestered from "../pages/DocterRegestered/DocterRegestered";
import DoctorProfile from "../pages/DoctorProfile/DoctorProfile";
import DoctorDashboard from "../pages/DoctorRelated/DoctorDashboard/DoctorDashboard";
import Home from "../pages/Home/Home";
import Patientprofile from "../pages/PatientProfile/Patientprofile";
import PatientRegistered from "../pages/PatientRegistered/PatientRegistered";
import Signin from "../pages/Signin/Signin";
import DoctorLayout from "../components/Layout/DoctorSideBarLayout";
import DoctorHome from "../pages/DoctorRelated/DoctorHome/DoctorHome";
import DoctorSidebarPatient from "../pages/DoctorSidebarPatient/DoctorSidebarPatient";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/doctor-profile" element={<DoctorProfile />} />
      <Route path="/patient-profile" element={<Patientprofile />} />
      <Route path="/register/doctor" element={<DocterRegestered />} />
      <Route path="/register/patient" element={<PatientRegistered />} />{" "}
      <Route path="/login" element={<Signin />} />
      <Route path="/chooseUser" element={<ChooseUser />} />
      {/* <Route
        path="/doctor/dashboard"
        element={
          <DoctorLayout>
            <DoctorDashboard />
          </DoctorLayout>
        }
      /> */}
      <Route
        path="/doctor/home"
        element={
          <DoctorLayout>
            <DoctorHome />
          </DoctorLayout>
        }
      />
      <Route
        path="/doctor/Patients"
        element={
          <DoctorLayout>
            <DoctorSidebarPatient />
          </DoctorLayout>
        }
      />
      <Route
        path="/doctor/Profile"
        element={
          <DoctorLayout>
            <DoctorProfile />
          </DoctorLayout>
        }
      />
      {/* <Route path="/doctor/Patients" element={<DoctorSidebarPatient />} /> */}
    </Routes>
  );
};

export default AppRouter;
