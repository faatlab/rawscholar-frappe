import React, { useContext, useEffect, useState } from "react";

import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.svg";
import StudyIllustration from "../../assets/StudyIllustration.svg";
import "./Signup.css";
import { useFrappeCreateDoc, useFrappeGetDocList } from "frappe-react-sdk";
import { toast } from "react-toastify";

function Signup({ setShow }) {
  useEffect(() => {
    setShow(false);
  });

  const navigate = useNavigate();

  const [inputData, setInputData] = useState({
    name1: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const { createDoc } = useFrappeCreateDoc();

  const [isVisible, setIsVisible] = useState(false);

  const getInputData = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const signin = (e) => {
    e.preventDefault();

    const { name1, email, phone, password, confirmPassword } = inputData;

    if (!name1 || !email || !phone || !password || !confirmPassword) {
      toast.warning("Fill the form");
    } else if (password !== confirmPassword) {
      toast.warning("Passwords doesn't match");
    } else {
      createDoc("Student", {
        name1,
        email,
        phone,
        password,
      })
        .then(() => {
          localStorage.setItem("userData", JSON.stringify({ name1, email }));
          toast.success(`${name1} account created`);
          navigate("/");
        })
        .catch((error) => {
          console.error(error);
          toast.warning(`${name1} already exists`);
        });
    }
  };

  const handleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="containerlogin d-flex justify-content-center align-items-center">
      <div style={{ height: "700px" }}>
        <img
          className="p-1 d-none d-sm-block"
          src={StudyIllustration}
          alt="Study"
          style={{ height: "100%" }}
        />
      </div>
      <form className="formContainer shadow d-flex flex-column align-items-center justify-content-between gap-2">
        <img className="mb-2" src={Logo} alt="" width={140} />
        <div className="form-group">
          <p className="m-0">
            Full Name<span style={{ color: "#067BC2" }}>*</span>
          </p>
          <input
            className="inputBox"
            type="text"
            name="name1"
            required
            onChange={(e) => getInputData(e)}
            placeholder="Enter Full Name"
            style={{ fontSize: "15px" }}
          />
        </div>
        <div className="form-group ">
          <p className="m-0">
            Email<span style={{ color: "#067BC2" }}>*</span>
          </p>
          <input
            className="inputBox"
            type="email"
            name="email"
            required
            onChange={(e) => getInputData(e)}
            placeholder="Enter Email"
            style={{ fontSize: "15px" }}
          />
        </div>
        <div className="form-group ">
          <p className="m-0">
            Phone<span style={{ color: "#067BC2" }}>*</span>
          </p>
          <input
            className="inputBox"
            type="text"
            name="phone"
            required
            onChange={(e) => getInputData(e)}
            placeholder="Enter Phone Number"
            style={{ fontSize: "15px" }}
          />
        </div>

        <div className="form-group ">
          <p className="m-0">
            Password<span style={{ color: "#067BC2" }}>*</span>
          </p>
          <div style={{ position: "relative" }}>
            <input
              className="inputBox"
              type={isVisible ? "text" : "password"}
              name="password"
              required
              onChange={(e) => getInputData(e)}
              placeholder="Enter Password"
              style={{ fontSize: "15px" }}
            />
            {isVisible ? (
              <span
                onClick={() => {
                  handleVisibility();
                }}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "10px",
                  cursor: "pointer",
                }}
                class="material-symbols-outlined"
              >
                visibility_off
              </span>
            ) : (
              <span
                onClick={() => {
                  handleVisibility();
                }}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "10px",
                  cursor: "pointer",
                }}
                class="material-symbols-outlined"
              >
                visibility
              </span>
            )}
          </div>
        </div>
        <div className="form-group mb-2">
          <p className="m-0">
            Confirm Password<span style={{ color: "#067BC2" }}>*</span>
          </p>
          <div style={{ position: "relative" }}>
            <input
              className="inputBox"
              type={isVisible ? "text" : "password"}
              name="confirmPassword"
              required
              onChange={(e) => getInputData(e)}
              placeholder="Enter Password"
              style={{ fontSize: "15px" }}
            />
            {isVisible ? (
              <span
                onClick={() => {
                  handleVisibility();
                }}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "10px",
                  cursor: "pointer",
                }}
                class="material-symbols-outlined"
              >
                visibility_off
              </span>
            ) : (
              <span
                onClick={() => {
                  handleVisibility();
                }}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "10px",
                  cursor: "pointer",
                }}
                class="material-symbols-outlined"
              >
                visibility
              </span>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="mt-2 w-100 py-2 border rounded text-light"
          style={{ fontSize: "15px", backgroundColor: "#067BC2" }}
          onClick={(e) => signin(e)}
        >
          Signup
        </button>
        <p className="mt-5" style={{ fontSize: "13px" }}>
          Already have an account?
          <Link
            to={"/login"}
            className="ms-2"
            style={{ color: "blue", fontSize: "13px" }}
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
