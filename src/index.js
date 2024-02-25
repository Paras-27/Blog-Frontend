import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./context/Context";
import { SearchProvider } from "./components/search/search";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>
    <SearchProvider>
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
    </SearchProvider>
  </ContextProvider>
);
