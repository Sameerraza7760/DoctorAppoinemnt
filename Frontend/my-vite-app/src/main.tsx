import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundry/ErrorBoundry";
import UserContextProvider from "./contexts/UserContexts/UserProvider";
import "./index.css";
import store, { persistor } from "./store/store";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 20000,
    },
  },
});
const root = createRoot(document.getElementById("root")!);

root.render(
  <ErrorBoundary>
    <Router>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ToastProvider>
            <UserContextProvider>
              <QueryClientProvider client={queryClient}>
                <App />
              </QueryClientProvider>
            </UserContextProvider>
          </ToastProvider>
        </PersistGate>
      </Provider>
    </Router>
  </ErrorBoundary>
);
