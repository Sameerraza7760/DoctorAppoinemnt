import Modal from "./components/Modal/Modal";
import AppRouter from "./Router/Router";

import Footer from "./components/Foooter/Footer";
import Header from "./components/Header/Header";
import DoctorDetailPage from "./pages/DoctorDetail/DoctorDetailPage";
function App() {
  return (
    <>
      {" "}
      <Header />
      {/* <Modal /> */}
      <AppRouter />
      <Footer />
    </>
  );
}

export default App;
