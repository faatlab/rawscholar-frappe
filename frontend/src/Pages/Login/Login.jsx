import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFrappeGetDoc } from "frappe-react-sdk";

import Logo from "../../assets/Logo.svg";
import StudyIllustration from "../../assets/StudyIllustration.svg";

import "./Login.css";
import { toast } from "react-toastify";

function Login({ setShow }) {
  useEffect(() => {
    setShow(false);
  });

  const navigate = useNavigate();

  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const [isVisible, setIsVisible] = useState(false);

  const getInputData = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  let loggedEmail = inputData.email;

  const { data } = useFrappeGetDoc("Student", loggedEmail);
  console.log(data);

  const handleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const login = () => {
    const { email, password } = inputData;
    if (!email || !password) {
      toast.warning("Please Fill the form");
    } else if (data?.email === email) {
      if (data?.password === password) {
        const { email, name1, name } = data;
        toast.success("Logged in Successfully");
        localStorage.setItem(
          "userData",
          JSON.stringify({ email, name1, name })
        );
        navigate("/");
      } else {
        toast.error("Invalid credentials");
      }
    } else {
      toast.error("No account found");
    }
  };

  return (
    <div className="containerlogin d-flex justify-content-center align-items-center">
      <img
        className="p-1  d-none d-sm-block"
        src={StudyIllustration}
        alt=""
        height="700"
      />
      <form className="formContainer shadow d-flex flex-column align-items-center gap-3">
        <img className="mb-4" src={Logo} alt="" width={200} />
        <div className="form-group mb-2">
          <p className="m-0">Email</p>
          <input
            className="inputBox"
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={(e) => getInputData(e)}
            style={{ fontSize: "15px" }}
          />
        </div>
        <div className="form-group mb-2">
          <p className="m-0">Password</p>
          <div style={{ position: "relative" }}>
            <input
              className="inputBox"
              type={isVisible ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              onChange={(e) => getInputData(e)}
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
        <Button
          className="mt-2 mb-3 w-100 "
          style={{ fontSize: "13px", backgroundColor: "#067BC2" }}
          onClick={() => login()}
        >
          Login
        </Button>
        <Link to="/forgotpassword" style={{ fontSize: "13px" }}>
          Forgotten Password?
        </Link>
        <p className=" mt-5" style={{ fontSize: "13px" }}>
          Don’t have account yet?
          <Link
            to={"/signup"}
            className="ms-2"
            style={{ color: "blue", fontSize: "13px" }}
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
