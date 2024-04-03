import React from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import "./index.css";
import UserContextProvider from "./contexts/UserContexts/UserProvider.tsx";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <Router>
          <App />
        </Router>
      </UserContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
