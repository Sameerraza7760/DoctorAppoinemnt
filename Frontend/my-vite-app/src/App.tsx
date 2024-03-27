import Footer from "./components/Foooter/Footer";
import Header from "./components/Header/Header";
import ChooseUser from "./pages/ChooseUser/ChooseUser";
import DocterRegestered from "./pages/DocterRegestered/DocterRegestered";
import PatientRegistered from "./pages/PatientRegistered/PatientRegistered";
import DoctorProfile from "./pages/DoctorProfile/DoctorProfile";

import Login from "./pages/Signin/Login";
import Patientprofile from "./pages/PatientProfile/Patientprofile";
function App() {
  return (
    <>
      <Header />
      <DocterRegestered />
      {/* <PatientRegistered /> <DoctorProfile /> */}
      {/* <Register /> */} <Footer />
    </>
  );
}

export default App;
