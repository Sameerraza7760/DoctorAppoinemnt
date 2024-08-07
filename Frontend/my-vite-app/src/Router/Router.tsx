import { Route, Routes } from "react-router-dom";
import DoctorLayout from "../components/Layout/DoctorSideBarLayout";
import ChooseUser from "../pages/ChooseUser/ChooseUser";
import DocterRegestered from "../pages/DocterRegestered/DocterRegestered";
import DoctorDetailPage from "../pages/DoctorDetail/DoctorDetailPage";
import DoctorProfile from "../pages/DoctorProfile/DoctorProfile";
import DoctorAppointment from "../pages/DoctorRelated/DoctorAppoinment/DoctorAppoinment";
import DoctorHome from "../pages/DoctorRelated/DoctorHome/DoctorHome";
import AppointmentUpdates from "../pages/DoctorRelated/PatientRelated/AppointmentUpdates/AppointmentUpdates";
import Home from "../pages/Home/Home";
import Patientprofile from "../pages/PatientProfile/Patientprofile";
import PatientRegistered from "../pages/PatientRegistered/PatientRegistered";
import DoctorsList from "../pages/PatientsRelated/DoctorsList/DoctorsList";
import Signin from "../pages/Signin/Signin";
import ProtectedRoute from "./ProtectedRoute";
import DoctorChat from "../pages/Chat/DoctorChatRoom/DoctorChat";
const routes = [
  { path: "/", isProtected: false, element: <Home /> },
  { path: "/doctor-profile", isProtected: true, element: <DoctorProfile /> },
  { path: "/patient-profile", isProtected: true, element: <Patientprofile /> },
  {
    path: "/register/doctor",
    isProtected: false,
    element: <DocterRegestered />,
  },
  {
    path: "/register/patient",
    isProtected: false,
    element: <PatientRegistered />,
  },
  { path: "/login", isProtected: false, element: <Signin /> },
  { path: "/chooseUser", isProtected: false, element: <ChooseUser /> },
  { path: "/doctorsList", isProtected: true, element: <DoctorsList /> },
  {
    path: "/doctorDetail/:id",
    isProtected: true,
    element: <DoctorDetailPage />,
  },
  {
    path: "/appointment-updates",
    isProtected: true,
    element: <AppointmentUpdates />,
  },
  {
    path: "/doctor/home",
    isProtected: true,
    element: (
      <DoctorLayout>
        <DoctorHome />
      </DoctorLayout>
    ),
  },

  {
    path: "doctor/Profile",
    isProtected: true,
    element: (
      <DoctorLayout>
        <DoctorProfile />
      </DoctorLayout>
    ),
  },
  {
    path: "/doctor/Appoinments",
    isProtected: true,
    element: (
      <DoctorLayout>
        <DoctorAppointment />
      </DoctorLayout>
    ),
  },
  {
    path: "/doctor/ChatRoom",
    isProtected: true,
    element: <DoctorChat />,
  },
];

const AppRouter = () => {
  return (
    <Routes>
      {routes.map(({ path, isProtected, element }) => (
        <Route
          key={path}
          path={path}
          element={
            isProtected ? <ProtectedRoute>{element}</ProtectedRoute> : element
          }
        />
      ))}
    </Routes>
  );
};

export default AppRouter;
