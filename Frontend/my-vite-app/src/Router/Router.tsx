import { Route, Routes } from "react-router-dom";
import ChooseUser from "../pages/ChooseUser/ChooseUser";
import DocterRegestered from "../pages/DocterRegestered/DocterRegestered";
import PatientRegistered from "../pages/PatientRegistered/PatientRegistered";
import Home from "../pages/Home/Home";
import DoctorProfile from "../pages/DoctorProfile/DoctorProfile";
import Patientprofile from "../pages/PatientProfile/Patientprofile";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/doctor-profile" element={<DoctorProfile />} />
      <Route path="/patient-profile" element={<Patientprofile />} />
      <Route path="/register/doctor" element={<DocterRegestered />} />
      <Route path="/register/patient" element={<PatientRegistered />} />
      <Route path="/chooseUser" element={<ChooseUser />} />
    </Routes>
  );
};

export default AppRouter;
