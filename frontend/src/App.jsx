import { useEffect, useState } from "react";
import { FrappeProvider } from "frappe-react-sdk";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./Pages/Home/Home";
import Countries from "./Pages/Countries/Countries";
import NavbarComponent from "./Components/NavbarComponent/NavbarComponent";
import FooterComponent from "./Components/FooterComponent/FooterComponent";
import Universities from "./Pages/Universities/Universities";
import University from "./Pages/University/University";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Course from "./Pages/Course/Course";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import ScrollToTop from "./Components/ScrollToTop";
import Contactus from "./Pages/Contactus/Contactus";
import Faq from "./Pages/FAQ/Faq";
import Profile from "./Pages/Profile/Profile";

import { Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import Test from "./Pages/Test/Test";
import Search from "./Pages/Search/Search";
import Application from "./Pages/Application/Application";

function App() {
  const [show, setShow] = useState(true);

  return (
    // <FrappeProvider url="https://rawscholar1.frappe.cloud">
    <FrappeProvider>
      {show && <NavbarComponent />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home setShow={setShow} />} />
        <Route path="/countries" element={<Countries setShow={setShow} />} />
        <Route
          path="/universities"
          element={<Universities setShow={setShow} />}
        />
        <Route path="/university" element={<University setShow={setShow} />} />
        <Route
          path="/university/course"
          element={<Course setShow={setShow} />}
        />
        <Route path="/login" element={<Login setShow={setShow} />} />
        <Route path="/signup" element={<Signup setShow={setShow} />} />

        <Route
          path="/forgotpassword"
          element={<ForgotPassword setShow={setShow} />}
        />
        <Route path="/profile" element={<Profile setShow={setShow} />} />
        <Route path="/search" element={<Search setShow={setShow} />} />
        <Route path="/contactus" element={<Contactus setShow={setShow} />} />
        <Route path="/faq" element={<Faq setShow={setShow} />} />
        <Route
          path="/user/applications"
          element={<Application setShow={setShow} />}
        />
        <Route path="*" element={<PageNotFound setShow={setShow} />} />
        <Route path="/test" element={<Test setShow={setShow} />} />
      </Routes>
      {show && <FooterComponent />}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </FrappeProvider>
  );
}

export default App;
