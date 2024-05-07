import { Route, Routes } from "react-router-dom";
import DoctorLayout from "../components/Layout/DoctorSideBarLayout";
import ChooseUser from "../pages/ChooseUser/ChooseUser";
import DocterRegestered from "../pages/DocterRegestered/DocterRegestered";
import DoctorProfile from "../pages/DoctorProfile/DoctorProfile";
import DoctorAppointment from "../pages/DoctorRelated/DoctorAppoinment/DoctorAppoinment";
import DoctorHome from "../pages/DoctorRelated/DoctorHome/DoctorHome";
import DoctorNotification from "../pages/DoctorRelated/DoctorNotification/DoctorNotification";
import DoctorSidebarPatient from "../pages/DoctorSidebarPatient/DoctorSidebarPatient";
import Home from "../pages/Home/Home";
import Patientprofile from "../pages/PatientProfile/Patientprofile";
import PatientRegistered from "../pages/PatientRegistered/PatientRegistered";
import DoctorsList from "../pages/PatientsRelated/DoctorsList/DoctorsList";
import Signin from "../pages/Signin/Signin";
import DoctorDetailPage from "../pages/DoctorDetail/DoctorDetailPage";
import AppointmentUpdates from "../pages/DoctorRelated/PatientRelated/AppointmentUpdates/AppointmentUpdates";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/doctor-profile" element={<DoctorProfile />} />
      <Route path="/patient-profile" element={<Patientprofile />} />
      <Route path="/register/doctor" element={<DocterRegestered />} />
      <Route path="/register/patient" element={<PatientRegistered />} />{" "}
      <Route path="/login" element={<Signin />} />
      <Route path="/chooseUser" element={<ChooseUser />} />{" "}
      <Route path="/doctorsList" element={<DoctorsList />} />{" "}
      <Route path="/doctorDetail/:id" element={<DoctorDetailPage />} />
      <Route path="/appointment-updates" element={<AppointmentUpdates />} />
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
      <Route
        path="/doctor/Appoinments"
        element={
          <DoctorLayout>
            <DoctorAppointment />
          </DoctorLayout>
        }
      />
      <Route
        path="/doctor/Notifications"
        element={
          <DoctorLayout>
            <DoctorNotification />
          </DoctorLayout>
        }
      />
      {/* <Route path="/doctor/Patients" element={<DoctorSidebarPatient />} /> */}
    </Routes>
  );
};

export default AppRouter;
