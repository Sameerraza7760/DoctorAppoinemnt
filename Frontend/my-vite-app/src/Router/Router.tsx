import { Route, Routes } from "react-router-dom";
import ChooseUser from "../pages/ChooseUser/ChooseUser";
import DocterRegestered from "../pages/DocterRegestered/DocterRegestered";
import DoctorProfile from "../pages/DoctorProfile/DoctorProfile";
import Home from "../pages/Home/Home";
import Patientprofile from "../pages/PatientProfile/Patientprofile";
import PatientRegistered from "../pages/PatientRegistered/PatientRegistered";
import Signin from "../pages/Signin/Signin";
import DoctorDashboard from "../pages/DoctorRelated/DoctorDashboard/DoctorDashboard";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/doctor-profile" element={<DoctorProfile />} />
      <Route path="/patient-profile" element={<Patientprofile />} />
      <Route path="/register/doctor" element={<DocterRegestered />} />
      <Route path="/register/patient" element={<PatientRegistered />} />{" "}
      <Route path="/login" element={<Signin />} />
      <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
      <Route path="/chooseUser" element={<ChooseUser />} />
    </Routes>
  );
};

export default AppRouter;
