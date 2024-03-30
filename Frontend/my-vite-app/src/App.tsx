import AppRouter from "./Router/Router";
import ErrorBoundary from "./components/ErrorBoundry/ErrorBoundry";
import Footer from "./components/Foooter/Footer";
import Header from "./components/Header/Header";
import DoctorSidebar from "./components/Sidebar/DoctorSidebar";
import DoctorDashboard from "./pages/DoctorRelated/DoctorDashboard/DoctorDashboard";
function App() {
  return (
    <>
      {" "}
      <ErrorBoundary>
        <Header />
        <AppRouter />
        <Footer />
      </ErrorBoundary>
    
    </>
  );
}

export default App;
