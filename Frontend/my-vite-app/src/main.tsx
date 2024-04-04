import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App.tsx";
import "./index.css";
import UserContextProvider from "./contexts/UserContexts/UserProvider.tsx";
import theme from "./theme.tsx";
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        {/* <ChakraProvider theme={theme} > */}
          {" "}
          <Router>
        
            <App />{" "}
          </Router>
        {/* </ChakraProvider> */}
      </UserContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
