import React from "react";
import Logo from "../../assets/Logo.svg";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Privacy({ setShow }) {
  useEffect(() => {
    setShow(false);
  });
  return (
    <div style={{ fontSize: "12px" }}>
      <div className="d-flex justify-content-center p-4">
        <img alt="Logo" src={Logo} height="50" className="" />
      </div>
      <div
        className="container shadow border p-lg-5 "
        style={{ borderRadius: "10px" }}
      >
        <p
          className="p-4 fw-bold  fs-5 d-flex justify-content-center"
          style={{ fontSize: "16px" }}
        >
          Privacy Policy of Rawscholar
        </p>
        <p className="container">
          At rawscholar, we are committed to protecting your privacy. This
          Privacy Policy explains how we collect, use, and safeguard your
          personal information, including payment details.
        </p>
        <div>
          <p className="px-4 fw-bold container">Privacy Policy of Rawscholar</p>
          <p className="container">
            <div className="p-3">
              <ul>
                <li className="p-1">
                  <span className="fw-bold"> Personal Information:</span> We
                  collect personal information when you voluntarily provide it
                  to us, such as when you fill out forms on our website,
                  register for services, or communicate with us. This may
                  include your name, email address, phone number, and any other
                  details you provide.
                </li>
                <li className="p-1">
                  <span className="fw-bold">Payment Information:</span> When you
                  make a payment for our services, we may collect payment
                  details such as your credit card number, billing address, and
                  other payment transaction details. We use a secure third-party
                  payment processor to handle this information securely.
                </li>
                <li className="p-1">
                  <span className="fw-bold">
                    Automatically Collected Information:
                  </span>{" "}
                  Like many websites, we automatically collect certain
                  information when you visit our site, such as your IP address,
                  browser type, operating system, referring URLs, and other
                  usage information. How We Use Your Information
                </li>
              </ul>
            </div>
          </p>
        </div>
        <div>
          <p className="px-4 fw-bold container">How We Use Your Information</p>
          <p className="container">
            <div className="p-3">
              <ul>
                <li className="p-1">
                  <span className="fw-bold"> Personal Information:</span>To
                  Provide Services: We use your personal information to provide
                  the services you request, process transactions, and fulfill
                  our contractual obligations.
                </li>
                <li className="p-1">
                  <span className="fw-bold">Communication:</span> We may use
                  your contact information to communicate with you, respond to
                  your inquiries, and provide information about our services.
                </li>
                <li className="p-1">
                  <span className="fw-bold">Improvement of Services:</span> We
                  analyze information to understand trends and improve our
                  website and services.
                </li>
                <li className="p-1">
                  <span className="fw-bold">Marketing:</span> With your consent,
                  we may send you promotional emails about our services or
                  updates about our website.
                </li>
                <p className="fw-bold mt-4">Sharing Your Information</p>
                <p>
                  We do not sell, trade, or otherwise transfer your personal
                  information to third parties without your consent, except as
                  necessary for providing our services or as required by law.
                </p>
                <p className="fw-bold mt-4">Data Security</p>
                <p>
                  While we take reasonable steps to protect your personal
                  information, Rawscholar cannot guarantee the security of
                  information transmitted over the internet. You transmit your
                  personal information to us at your own risk.
                </p>
                <p className="fw-bold mt-4">Your Rights</p>
                <p>
                  You have the right to access, correct, update, or delete your
                  personal information at any time. You may also opt-out of
                  receiving promotional communications from us.
                </p>
                <p className="fw-bold mt-4">Payment Processing</p>
                <p>
                  You have the right to access, correct, update, or delete your
                  personal information at any time. You may also opt-out of
                  receiving promotional communications from us.
                </p>
                <p className="fw-bold mt-4">Changes to This Privacy Policy</p>
                <p>
                  We may update this Privacy Policy from time to time to reflect
                  changes in our practices and services. We encourage you to
                  review this Privacy Policy periodically.
                </p>
                <p className=" fw-bold container p-2">Copyright</p>
                <li className="p-1">
                  Rawscholar claims copyright ownership of all material on this
                  web site, unless expressly stated otherwise.
                </li>
                <p className="fw-bold mt-4">Contact Us</p>
                <p>
                  If you have any questions about this Privacy Policy or our
                  practices, please contact us at{" "}
                  <Link style={{ color: "blue" }}>rawscholar@gmail.com.</Link>
                </p>
              </ul>
            </div>
          </p>
        </div>
      </div>
      <br />
    </div>
  );
}

export default Privacy;
