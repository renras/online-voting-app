import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/main.scss";
import reportWebVitals from "./reportWebVitals";
import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Election from "./pages/Election/Election";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Results from "./pages/Results/Results";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="election" element={<Election />} />
        <Route path="results" element={<Results />} />
      </Routes>
      <ToastContainer />
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
