import AppRouter from "./Router/Router";
import ErrorBoundary from "./components/ErrorBoundry/ErrorBoundry";
import Footer from "./components/Foooter/Footer";
import Header from "./components/Header/Header";import DoctorSidebarPatient from "./pages/DoctorSidebarPatient/DoctorSidebarPatient";
function App() {
  return (
    <>
      {" "}
      <ErrorBoundary>
        <Header />
        <AppRouter />
        <Footer />
      </ErrorBoundary>
      {/* <DoctorSidebarPatient/>/ */}
    
    </>
  );
}

export default App;
