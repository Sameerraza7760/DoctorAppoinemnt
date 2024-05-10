import { Route, Routes } from "react-router-dom";
import DoctorLayout from "../components/Layout/DoctorSideBarLayout";
import ChooseUser from "../pages/ChooseUser/ChooseUser";
import DocterRegestered from "../pages/DocterRegestered/DocterRegestered";
import DoctorDetailPage from "../pages/DoctorDetail/DoctorDetailPage";
import DoctorProfile from "../pages/DoctorProfile/DoctorProfile";
import DoctorAppointment from "../pages/DoctorRelated/DoctorAppoinment/DoctorAppoinment";
import DoctorHome from "../pages/DoctorRelated/DoctorHome/DoctorHome";
import AppointmentUpdates from "../pages/DoctorRelated/PatientRelated/AppointmentUpdates/AppointmentUpdates";
import DoctorSidebarPatient from "../pages/DoctorSidebarPatient/DoctorSidebarPatient";
import Home from "../pages/Home/Home";
import Patientprofile from "../pages/PatientProfile/Patientprofile";
import PatientRegistered from "../pages/PatientRegistered/PatientRegistered";
import DoctorsList from "../pages/PatientsRelated/DoctorsList/DoctorsList";
import Signin from "../pages/Signin/Signin";
import ProtectedRoute from "./ProtectedRoute";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/doctor-profile"
        element={
          <ProtectedRoute>
            <DoctorProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient-profile"
        element={
          <ProtectedRoute>
            <Patientprofile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/register/doctor"
        element={
          <ProtectedRoute>
            <DocterRegestered />
          </ProtectedRoute>
        }
      />
      <Route
        path="/register/patient"
        element={
          <ProtectedRoute>
            <PatientRegistered />
          </ProtectedRoute>
        }
      />{" "}
      <Route path="/login" element={<Signin />} />
      <Route path="/chooseUser" element={<ChooseUser />} />{" "}
      <Route path="/doctorsList" element={<DoctorsList />} />{" "}
      <Route
        path="/doctorDetail/:id"
        element={
          <ProtectedRoute>
            <DoctorDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/appointment-updates"
        element={
          <ProtectedRoute>
            <AppointmentUpdates />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/home"
        element={
          <ProtectedRoute>
            <DoctorLayout>
              <DoctorHome />
            </DoctorLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/Patients"
        element={
          <ProtectedRoute>
            <DoctorLayout>
              <DoctorSidebarPatient />
            </DoctorLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/Profile"
        element={
          <ProtectedRoute>
            <DoctorLayout>
              <DoctorProfile />
            </DoctorLayout>{" "}
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/Appoinments"
        element={
          <ProtectedRoute>
            <DoctorLayout>
              <DoctorAppointment />
            </DoctorLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
