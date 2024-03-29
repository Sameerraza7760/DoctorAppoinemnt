import AppRouter from "./Router/Router";
import ErrorBoundary from "./components/ErrorBoundry/ErrorBoundry";
import Footer from "./components/Foooter/Footer";
import Header from "./components/Header/Header";
function App() {
  return (
    <>
      {" "}
      <ErrorBoundary>
        <Header />
        <AppRouter />
        <Footer />
      </ErrorBoundary>
      {/* <DocterRegestered /> */}
      {/* <ChooseUser />  */}
      {/* <Register /> */}
    </>
  );
}

export default App;
