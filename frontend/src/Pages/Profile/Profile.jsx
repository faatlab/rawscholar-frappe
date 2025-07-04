import edit from "../../assets/Edit.svg";
import save from "../../assets/Save.svg";
import profileImg from "../../assets/profile image/Profile.png";
import frame from "../../assets/profile image/Frame.svg";
import uploadImg from "../../assets/profile image/uploadImg.svg";
import {
  useFrappeFileUpload,
  useFrappeGetDoc,
  useFrappeUpdateDoc,
} from "frappe-react-sdk";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../Components/ContextShare";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

function Profile({ setShow }) {
  useEffect(() => {
    setShow(true);
    if (!localStorage.getItem("userData")) {
      navigate("/login");
      toast.warning("Please login or sign-up before continuing");
    }
  });

  const navigate = useNavigate();

  const { userData, setUserData } = useContext(userContext);

  const [tenthData, setTenthData] = useState({});
  const [twelfthData, setTwelfthData] = useState({});
  const [bachelorsData, setBachelorsData] = useState({});
  const [mastersData, setMastersData] = useState({});
  const [qualifications, setQualifications] = useState([]);
  const [file, setFile] = useState(null);

  const [editable, setEditable] = useState(true);

  const [inputData, setInputData] = useState({});

  let loggedData = JSON.parse(localStorage.getItem("userData"));

  const { data, mutate } = useFrappeGetDoc("Student", loggedData?.email);
  // console.log(data);
  const { updateDoc } = useFrappeUpdateDoc();
  const { upload, loading } = useFrappeFileUpload();

  useEffect(() => {
    if (data) {
      setInputData(data);
      setTenthData({
        ...tenthData,
        parent: data?.name,
        parenttype: data?.doctype,
        parentfield: "qualifications",
        qualification: "10th",
        cgpa: data.qualifications[0]?.cgpa,
        percentage: data.qualifications[0]?.percentage,
      });
      setTwelfthData({
        ...twelfthData,
        parent: data?.name,
        parenttype: data?.doctype,
        parentfield: "qualifications",
        qualification: "12th",
        cgpa: data.qualifications[1]?.cgpa,
        percentage: data.qualifications[1]?.percentage,
      });
      setBachelorsData({
        ...bachelorsData,
        parent: data?.name,
        parenttype: data?.doctype,
        parentfield: "qualifications",
        qualification: "Bachelors",
        cgpa: data.qualifications[2]?.cgpa,
        percentage: data.qualifications[2]?.percentage,
      });
      setMastersData({
        ...mastersData,
        parent: data?.name,
        parenttype: data?.doctype,
        parentfield: "qualifications",
        qualification: "Masters",
        cgpa: data.qualifications[3]?.cgpa,
        percentage: data.qualifications[3]?.percentage,
      });
    }
  }, [data]);

  const getInputData = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  useEffect(() => {
    setUserData(inputData);
  }, [inputData]);

  const get10thQualification = (e) => {
    const { name, value } = e.target;
    setTenthData({
      ...tenthData,
      [name]: value,
    });
  };

  const get12thQualification = (e) => {
    const { name, value } = e.target;
    setTwelfthData({
      ...twelfthData,
      [name]: value,
    });
  };

  const getBachelorsQualification = (e) => {
    const { name, value } = e.target;
    setBachelorsData({
      ...bachelorsData,
      [name]: value,
    });
  };

  const getMastersQualification = (e) => {
    const { name, value } = e.target;
    setMastersData({
      ...mastersData,
      [name]: value,
    });
  };

  useEffect(() => {
    setQualifications([tenthData, twelfthData, bachelorsData, mastersData]);
  }, [tenthData, twelfthData, bachelorsData, mastersData]);

  useEffect(() => {
    setUserData({ ...userData, qualifications });
  }, [qualifications]);

  const handleEdit = () => {
    setEditable(!editable);
    if (editable == false) {
      updateDoc("Student", data.name, userData)
        .then(() => {
          toast.success("Edited successfully");
          mutate();
        })
        .catch(() => {
          toast.warning("No changes made");
        });
    }
  };

  useEffect(() => {
    if (file?.photo) {
      console.log("here");
      upload(file.photo, {
        is_private: 1,
      }).then((res) => {
        updateDoc("Student", data.name, { photo: res.file_url }).then(() => {
          toast.success("Profile picture updated successfully");
        });
        mutate();
      });
    } else if (file) {
      console.log(file);
      upload(file.file, {
        is_private: 1,
      }).then((res) => {
        updateDoc("Student", data.name, {
          files: [
            ...data?.files,
            {
              parent: data?.name,
              parenttype: data?.doctype,
              parentfield: "files",
              attachment_type: file.attachment_type,
              file: res.file_url,
            },
          ],
        }).then(() => {
          toast.success(`${file.attachment_type} uploaded successfully`);
        });
        mutate();
      });
    }
  }, [file]);

  return (
    <section id="profileContainer">
      <div className="container my-5">
        <div>
          <div className="d-flex justify-content-between align-items-center pt-3">
            <h2
              style={{
                color: "#067BC2",
              }}
            >
              Hello {inputData.name1} 👋
            </h2>
            <Link
              to="/user/applications"
              className="btn rounded-pill fw-bold py-2 px-3"
              style={{ backgroundColor: "#39C6B5", color: "white" }}
            >
              Go to Applications 👈
            </Link>
          </div>
          <p className="mt-4">
            Get what you deserve. Never miss an opportunity & don't fall for
            sparking words by consultancies. we will guide you in right path.
            Never missopportunity & don't fall for sparking words by
            consultancies. Never miss an opportunity & don't fall for sparking
            words by consultancies.
          </p>
          <div className="titleBar d-flex shapeParent mt-5 ">
            <div className="shape"></div>
            <h2 className="fs-4 ms-4">Personal Details</h2>
            {editable ? (
              <button
                className="ms-auto py-2  px-3 shadow border "
                style={{
                  backgroundColor: "#067BC2",
                  borderRadius: "20px",
                  textDecoration: "none",
                  width: "7rem",
                }}
                onClick={() => handleEdit()}
              >
                <span className="p-2" style={{ color: "white" }}>
                  Edit
                </span>
                <img src={edit} alt="" />
              </button>
            ) : (
              <button
                className="ms-auto py-2  px-3 shadow border "
                style={{
                  backgroundColor: "#067BC2",
                  borderRadius: "20px",
                  textDecoration: "none",
                  width: "7rem",
                }}
                onClick={() => handleEdit()}
              >
                <span className="p-2" style={{ color: "white" }}>
                  Save
                </span>
                <img src={save} alt="" height={20} />
              </button>
            )}
          </div>
        </div>
        <div className="row p-3">
          <div className="col-lg-2 d-flex justify-content-center">
            <div
              style={{
                position: "relative",
                width: "140px",
                height: "140px",
              }}
              className="rounded-circle border"
            >
              {loading && (
                <BeatLoader
                  color="#39C6B5"
                  size={20}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "75%",
                    transform: "translate(-50%,-50%)",
                    width: "100%",
                  }}
                />
              )}
              <img
                src={
                  data?.photo
                    ? `https://rawscholar1.frappe.cloud${data.photo}`
                    : profileImg
                }
                className="rounded-circle"
                alt="rounded image"
                style={{ width: "100%", height: "100%" }}
              />
              <input
                type="file"
                name="photo"
                onChange={(e) => {
                  if (e.target.files) {
                    setFile({ [e.target.name]: e.target.files[0] });
                  }
                }}
                id="photo"
                style={{ display: "none" }}
              />
              <label
                htmlFor="photo"
                style={{
                  position: "absolute",
                  bottom: "0",
                  right: "0",
                  cursor: "pointer",
                }}
              >
                <img src={frame} className="" alt="rounded image" />
              </label>
            </div>
          </div>
          <div className="col-md-6 col-lg-5">
            {/* input section */}

            <form action="">
              {/* name */}
              <div className="form-group d-lg-flex align-items-center gap-3 p-2">
                <label style={{ color: "#067BC2", width: "100px" }}>Name</label>
                <input
                  className="inputBox shadow "
                  type="text"
                  name="name1"
                  value={inputData.name1 || ""}
                  disabled={editable}
                  onChange={(e) => getInputData(e)}
                  placeholder="Enter Name"
                  style={{ fontSize: "15px", border: "none" }}
                />
              </div>
              {/* mail id */}
              <div className="form-group d-lg-flex align-items-center gap-3 p-2">
                <label style={{ color: "#067BC2", width: "100px" }}>
                  Mail ID
                </label>
                <input
                  className="inputBox shadow "
                  type="email"
                  name="email"
                  value={inputData.email || ""}
                  disabled
                  onChange={(e) => getInputData(e)}
                  placeholder="Enter Mail ID"
                  style={{ fontSize: "15px", border: "none" }}
                />
              </div>
              {/* phone number */}
              <div className="form-group d-lg-flex align-items-center gap-3 p-2">
                <label style={{ color: "#067BC2", width: "100px" }}>
                  Phone No
                </label>
                <input
                  className="inputBox shadow "
                  type="number"
                  name="phone"
                  value={inputData.phone || ""}
                  disabled={editable}
                  onChange={(e) => getInputData(e)}
                  placeholder="Enter PhoneNo"
                  style={{
                    fontSize: "15px",
                    border: "none",
                    appearance: "none",
                  }}
                />
              </div>
              {/* gender */}
              <div className="form-group d-lg-flex align-items-center gap-3 p-2">
                <label style={{ color: "#067BC2", width: "100px" }}>
                  Gender
                </label>
                <select
                  className="inputBox shadow "
                  aria-label="Default select example"
                  name="gender"
                  disabled={editable}
                  onChange={(e) => getInputData(e)}
                  value={inputData.gender || ""}
                  style={{ fontSize: "15px", border: "none" }}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </form>
          </div>
          {/* next section  */}

          <div className="col-md-6 col-lg-5">
            <div className="form-group d-lg-flex align-items-center gap-3 p-2">
              <label
                className=" d-flex align-items-center"
                style={{ color: "#067BC2", width: "100px" }}
              >
                DOB
              </label>
              <input
                className="inputBox shadow "
                type="date"
                name="dob"
                value={inputData.dob || ""}
                disabled={editable}
                onChange={(e) => getInputData(e)}
                placeholder="Select DOB"
                style={{ fontSize: "15px", border: "none", color: "gray" }}
              />
            </div>
            <div className="form-group d-lg-flex align-items-center gap-3 p-2">
              <label className="" style={{ color: "#067BC2", width: "100px" }}>
                Passport No
              </label>
              <input
                className="inputBox shadow "
                type="text"
                name="passport_no"
                value={inputData.passport_no || ""}
                disabled={editable}
                onChange={(e) => getInputData(e)}
                placeholder="Enter Passport No"
                style={{ fontSize: "15px", border: "none" }}
              />
            </div>
            <div className="form-group d-lg-flex align-items-center gap-3 p-2">
              <label
                className=" d-flex"
                style={{ color: "#067BC2", width: "100px" }}
              >
                Address
              </label>
              <textarea
                className="inputBox shadow  "
                name="address"
                value={inputData.address || ""}
                disabled={editable}
                onChange={(e) => getInputData(e)}
                placeholder="Enter Address"
                style={{ fontSize: "15px", border: "none" }}
              />
            </div>
          </div>
        </div>
        <div className="p-2 ">
          <div className="titleBar d-flex shapeParent mt-5 ">
            <div className="shape"></div>
            <h2 className="fs-4 ms-4">Education Info</h2>
            {editable ? (
              <button
                className="ms-auto py-2  px-3 shadow border "
                style={{
                  backgroundColor: "#067BC2",
                  borderRadius: "20px",
                  textDecoration: "none",
                  width: "7rem",
                }}
                onClick={() => handleEdit()}
              >
                <span className="p-2" style={{ color: "white" }}>
                  Edit
                </span>
                <img src={edit} alt="" />
              </button>
            ) : (
              <button
                className="ms-auto py-2  px-3 shadow border "
                style={{
                  backgroundColor: "#067BC2",
                  borderRadius: "20px",
                  textDecoration: "none",
                  width: "7rem",
                }}
                onClick={() => handleEdit()}
              >
                <span className="p-2" style={{ color: "white" }}>
                  Save
                </span>
                <img src={save} alt="" height={20} />
              </button>
            )}
          </div>
        </div>

        {/* education info */}
        <div className="row ms-lg-0 ms-3">
          <div className="col-lg-1"></div>
          <div className="col-lg-5 col-6">
            <div className="form-group d-lg-flex align-items-center gap-3 p-2">
              <label
                className=" d-flex align-items-center"
                style={{ color: "#067BC2", width: "110px", height: "43px" }}
              >
                10th Grade
              </label>
              <label
                className=" d-flex align-items-center"
                style={{ color: "gray", width: "100px", height: "43px" }}
              >
                Percentage
              </label>
              <input
                className="inputBox shadow "
                type="number"
                name="percentage"
                value={tenthData.percentage || ""}
                onChange={(e) => get10thQualification(e)}
                disabled={editable}
                placeholder="%"
                style={{
                  fontSize: "15px",
                  border: "none",
                  color: "gray",
                  width: "70px ",
                }}
              />
              <label
                className=" d-flex align-items-center"
                style={{ color: "gray", width: "70px", height: "43px" }}
              >
                CGPA
              </label>
              <input
                className="inputBox shadow "
                type="number"
                name="cgpa"
                value={tenthData.cgpa || ""}
                onChange={(e) => get10thQualification(e)}
                disabled={editable}
                placeholder=""
                style={{
                  fontSize: "15px",
                  border: "none",
                  color: "gray",
                  width: "70px ",
                }}
              />
            </div>
            <div className="form-group d-lg-flex align-items-center gap-3 p-2">
              <label
                className="d-flex align-items-center"
                style={{ color: "#067BC2", width: "110px", height: "43px" }}
              >
                12th Grade
              </label>
              <label
                className=" d-flex align-items-center"
                style={{ color: "gray", width: "100px", height: "43px" }}
              >
                Percentage
              </label>
              <input
                className="inputBox shadow "
                type="number"
                name="percentage"
                value={twelfthData.percentage || ""}
                onChange={(e) => get12thQualification(e)}
                disabled={editable}
                placeholder="%"
                style={{
                  fontSize: "15px",
                  border: "none",
                  color: "gray",
                  width: "70px ",
                }}
              />
              <label
                className=" d-flex align-items-center"
                style={{ color: "gray", width: "70px", height: "43px" }}
              >
                CGPA
              </label>
              <input
                className="inputBox shadow "
                type="number"
                name="cgpa"
                value={twelfthData.cgpa || ""}
                onChange={(e) => get12thQualification(e)}
                disabled={editable}
                placeholder=""
                style={{
                  fontSize: "15px",
                  border: "none",
                  color: "gray",
                  width: "70px ",
                }}
              />
            </div>
          </div>
          <div className="col-lg-5 col-6">
            <div className="form-group d-lg-flex align-items-center gap-3 p-2">
              <label
                className=" d-flex align-items-center"
                style={{ color: "#067BC2", width: "110px", height: "43px" }}
              >
                Bachelors
              </label>
              <label
                className=" d-flex align-items-center"
                style={{ color: "gray", width: "100px", height: "43px" }}
              >
                Percentage
              </label>
              <input
                className="inputBox shadow "
                type="number"
                name="percentage"
                value={bachelorsData.percentage || ""}
                onChange={(e) => getBachelorsQualification(e)}
                disabled={editable}
                placeholder="%"
                style={{
                  fontSize: "15px",
                  border: "none",
                  color: "gray",
                  width: "70px ",
                }}
              />
              <label
                className=" d-flex align-items-center"
                style={{ color: "gray", width: "70px", height: "43px" }}
              >
                CGPA
              </label>
              <input
                className="inputBox shadow "
                type="number"
                name="cgpa"
                value={bachelorsData.cgpa || ""}
                onChange={(e) => getBachelorsQualification(e)}
                disabled={editable}
                placeholder=""
                style={{
                  fontSize: "15px",
                  border: "none",
                  color: "gray",
                  width: "70px ",
                }}
              />
            </div>
            <div className="form-group d-lg-flex align-items-center gap-3 p-2">
              <label
                className=" d-flex align-items-center"
                style={{ color: "#067BC2", width: "110px", height: "43px" }}
              >
                Masters
              </label>
              <label
                className=" d-flex align-items-center"
                style={{ color: "gray", width: "100px", height: "43px" }}
              >
                Percentage
              </label>
              <input
                className="inputBox shadow "
                type="number"
                name="percentage"
                value={mastersData.percentage || ""}
                onChange={(e) => getMastersQualification(e)}
                disabled={editable}
                placeholder="%"
                style={{
                  fontSize: "15px",
                  border: "none",
                  color: "gray",
                  width: "70px ",
                }}
              />
              <label
                className=" d-flex align-items-center"
                style={{ color: "gray", width: "70px", height: "43px" }}
              >
                CGPA
              </label>
              <input
                className="inputBox shadow "
                type="number"
                name="cgpa"
                value={mastersData.cgpa || ""}
                onChange={(e) => getMastersQualification(e)}
                disabled={editable}
                placeholder=""
                style={{
                  fontSize: "15px",
                  border: "none",
                  color: "gray",
                  width: "70px ",
                }}
              />
            </div>
          </div>
          <div className="col-lg-1"></div>
        </div>
        {/* Upload Documents */}
        <div className="p-2 ">
          <div className="titleBar d-flex shapeParent mt-5 ">
            <div className="shape"></div>
            <h2 className="fs-4 ms-4">Upload Documents </h2>
          </div>
        </div>

        <div className="row">
          {/* General Documents */}
          <div className="col-lg-4">
            <div className="p-2 ">
              <div className="titleBar d-flex shapeParent mt-5 ">
                <div className="shape" style={{ height: "25px" }}></div>
                <h2 className="fs-5 ms-4">General Documents</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-6 col-lg-12">
                <div className="form-group d-lg-flex align-items-center gap-3 p-2">
                  <label
                    className=" d-flex align-items-center"
                    style={{ color: "#067BC2", width: "110px", height: "43px" }}
                  >
                    CV/Resume*
                  </label>
                  <input
                    type="file"
                    name="CV/Resume"
                    onChange={(e) => {
                      if (e.target.files) {
                        setFile({
                          file: e.target.files[0],
                          attachment_type: e.target.name,
                        });
                      }
                    }}
                    id="CV/Resume"
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor="CV/Resume"
                    className=" py-2  px-3 shadow border"
                    style={{
                      borderRadius: "20px",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      style={{ width: "30px", backgroundColor: "#39C6B5" }}
                      className="p-1 rounded-circle"
                      src={uploadImg}
                      alt=""
                    />
                    <span className="p-2" style={{ color: "#39C6B5" }}>
                      Upload
                    </span>
                  </label>
                </div>
                <div className="form-group d-lg-flex align-items-center gap-3 p-2">
                  <label
                    className=" d-flex align-items-center"
                    style={{ color: "#067BC2", width: "110px", height: "43px" }}
                  >
                    SOP*
                  </label>
                  <input
                    type="file"
                    name="SOP"
                    onChange={(e) => {
                      if (e.target.files) {
                        setFile({
                          file: e.target.files[0],
                          attachment_type: e.target.name,
                        });
                      }
                    }}
                    id="SOP"
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor="SOP"
                    className=" py-2  px-3 shadow border"
                    style={{
                      borderRadius: "20px",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      style={{ width: "30px", backgroundColor: "#39C6B5" }}
                      className="p-1 rounded-circle"
                      src={uploadImg}
                      alt=""
                    />
                    <span className="p-2" style={{ color: "#39C6B5" }}>
                      Upload
                    </span>
                  </label>
                </div>
              </div>
              <div className="col-6 col-lg-12">
                <div className="form-group d-lg-flex align-items-center gap-3 p-2">
                  <label
                    className=" d-flex align-items-center"
                    style={{ color: "#067BC2", width: "110px", height: "43px" }}
                  >
                    LOR*
                  </label>
                  <input
                    type="file"
                    name="LOR"
                    onChange={(e) => {
                      if (e.target.files) {
                        setFile({
                          file: e.target.files[0],
                          attachment_type: e.target.name,
                        });
                      }
                    }}
                    id="LOR"
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor="LOR"
                    className=" py-2  px-3 shadow border"
                    style={{
                      borderRadius: "20px",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      style={{ width: "30px", backgroundColor: "#39C6B5" }}
                      className="p-1 rounded-circle"
                      src={uploadImg}
                      alt=""
                    />
                    <span className="p-2" style={{ color: "#39C6B5" }}>
                      Upload
                    </span>
                  </label>
                </div>
                <div className="form-group d-lg-flex align-items-center gap-3 p-2">
                  <label
                    className=" d-flex align-items-center"
                    style={{ color: "#067BC2", width: "110px", height: "43px" }}
                  >
                    Passport*
                  </label>
                  <input
                    type="file"
                    name="Passport"
                    onChange={(e) => {
                      if (e.target.files) {
                        setFile({
                          file: e.target.files[0],
                          attachment_type: e.target.name,
                        });
                      }
                    }}
                    id="Passport"
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor="Passport"
                    className=" py-2  px-3 shadow border"
                    style={{
                      borderRadius: "20px",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      style={{ width: "30px", backgroundColor: "#39C6B5" }}
                      className="p-1 rounded-circle"
                      src={uploadImg}
                      alt=""
                    />
                    <span className="p-2" style={{ color: "#39C6B5" }}>
                      Upload
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* Academic certificate */}
          <div className="col-lg-4">
            <div className="p-2 ">
              <div className="titleBar d-flex shapeParent mt-5 ">
                <div className="shape" style={{ height: "25px" }}></div>
                <h2 className="fs-5 ms-4">Academic certificate</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-6 col-lg-12">
                <div className="form-group d-lg-flex align-items-center gap-3 p-2">
                  <label
                    className=" d-flex align-items-center"
                    style={{ color: "#067BC2", width: "110px", height: "43px" }}
                  >
                    10th Grade*
                  </label>
                  <input
                    type="file"
                    name="10th Grade"
                    onChange={(e) => {
                      if (e.target.files) {
                        setFile({
                          file: e.target.files[0],
                          attachment_type: e.target.name,
                        });
                      }
                    }}
                    id="10th Grade"
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor="10th Grade"
                    className=" py-2  px-3 shadow border"
                    style={{
                      borderRadius: "20px",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      style={{ width: "30px", backgroundColor: "#39C6B5" }}
                      className="p-1 rounded-circle"
                      src={uploadImg}
                      alt=""
                    />
                    <span className="p-2" style={{ color: "#39C6B5" }}>
                      Upload
                    </span>
                  </label>
                </div>
                <div className="form-group d-lg-flex align-items-center gap-3 p-2">
                  <label
                    className=" d-flex align-items-center"
                    style={{ color: "#067BC2", width: "110px", height: "43px" }}
                  >
                    12th Grade*
                  </label>
                  <input
                    type="file"
                    name="12th Grade"
                    onChange={(e) => {
                      if (e.target.files) {
                        setFile({
                          file: e.target.files[0],
                          attachment_type: e.target.name,
                        });
                      }
                    }}
                    id="12th Grade"
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor="12th Grade"
                    className=" py-2  px-3 shadow border"
                    style={{
                      borderRadius: "20px",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      style={{ width: "30px", backgroundColor: "#39C6B5" }}
                      className="p-1 rounded-circle"
                      src={uploadImg}
                      alt=""
                    />
                    <span className="p-2" style={{ color: "#39C6B5" }}>
                      Upload
                    </span>
                  </label>
                </div>
              </div>
              <div className="col-6 col-lg-12">
                <div className="form-group d-lg-flex align-items-center gap-3 p-2">
                  <label
                    className=" d-flex align-items-center"
                    style={{ color: "#067BC2", width: "110px", height: "43px" }}
                  >
                    Bachelors
                  </label>
                  <input
                    type="file"
                    name="Bachelors"
                    onChange={(e) => {
                      if (e.target.files) {
                        setFile({
                          file: e.target.files[0],
                          attachment_type: e.target.name,
                        });
                      }
                    }}
                    id="Bachelors"
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor="Bachelors"
                    className=" py-2  px-3 shadow border"
                    style={{
                      borderRadius: "20px",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      style={{ width: "30px", backgroundColor: "#39C6B5" }}
                      className="p-1 rounded-circle"
                      src={uploadImg}
                      alt=""
                    />
                    <span className="p-2" style={{ color: "#39C6B5" }}>
                      Upload
                    </span>
                  </label>
                </div>
                <div className="form-group d-lg-flex align-items-center gap-3 p-2">
                  <label
                    className=" d-flex align-items-center"
                    style={{ color: "#067BC2", width: "110px", height: "43px" }}
                  >
                    Masters
                  </label>
                  <input
                    type="file"
                    name="Masters"
                    onChange={(e) => {
                      if (e.target.files) {
                        setFile({
                          file: e.target.files[0],
                          attachment_type: e.target.name,
                        });
                      }
                    }}
                    id="Masters"
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor="Masters"
                    className=" py-2  px-3 shadow border"
                    style={{
                      borderRadius: "20px",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      style={{ width: "30px", backgroundColor: "#39C6B5" }}
                      className="p-1 rounded-circle"
                      src={uploadImg}
                      alt=""
                    />
                    <span className="p-2" style={{ color: "#39C6B5" }}>
                      Upload
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* Additional Documents */}
          <div className="col-lg-4 mb-4">
            <div className="p-2 ">
              <div className="titleBar d-flex shapeParent mt-5 ">
                <div className="shape" style={{ height: "25px" }}></div>
                <h2 className="fs-5 ms-4">Additional Documents</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-6 col-lg-12">
                <div className="form-group d-lg-flex align-items-center gap-3 p-2">
                  <label
                    className=" d-flex align-items-center"
                    style={{ color: "#067BC2", width: "110px", height: "43px" }}
                  >
                    Documents 1
                  </label>
                  <input
                    type="file"
                    name="Documents 1"
                    onChange={(e) => {
                      if (e.target.files) {
                        setFile({
                          file: e.target.files[0],
                          attachment_type: e.target.name,
                        });
                      }
                    }}
                    id="Documents 1"
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor="Documents 1"
                    className=" py-2  px-3 shadow border"
                    style={{
                      borderRadius: "20px",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      style={{ width: "30px", backgroundColor: "#39C6B5" }}
                      className="p-1 rounded-circle"
                      src={uploadImg}
                      alt=""
                    />
                    <span className="p-2" style={{ color: "#39C6B5" }}>
                      Upload
                    </span>
                  </label>
                </div>
                <div className="form-group d-lg-flex align-items-center gap-3 p-2">
                  <label
                    className=" d-flex align-items-center"
                    style={{ color: "#067BC2", width: "110px", height: "43px" }}
                  >
                    Documents 2
                  </label>
                  <input
                    type="file"
                    name="Documents 2"
                    onChange={(e) => {
                      if (e.target.files) {
                        setFile({
                          file: e.target.files[0],
                          attachment_type: e.target.name,
                        });
                      }
                    }}
                    id="Documents 2"
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor="Documents 2"
                    className=" py-2  px-3 shadow border"
                    style={{
                      borderRadius: "20px",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      style={{ width: "30px", backgroundColor: "#39C6B5" }}
                      className="p-1 rounded-circle"
                      src={uploadImg}
                      alt=""
                    />
                    <span className="p-2" style={{ color: "#39C6B5" }}>
                      Upload
                    </span>
                  </label>
                </div>
              </div>
              <div className="col-6 col-lg-12">
                <div className="form-group d-lg-flex align-items-center gap-3 p-2">
                  <label
                    className=" d-flex align-items-center"
                    style={{ color: "#067BC2", width: "110px", height: "43px" }}
                  >
                    Documents 3
                  </label>
                  <input
                    type="file"
                    name="Documents 3"
                    onChange={(e) => {
                      if (e.target.files) {
                        setFile({
                          file: e.target.files[0],
                          attachment_type: e.target.name,
                        });
                      }
                    }}
                    id="Documents 3"
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor="Documents 3"
                    className=" py-2  px-3 shadow border"
                    style={{
                      borderRadius: "20px",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      style={{ width: "30px", backgroundColor: "#39C6B5" }}
                      className="p-1 rounded-circle"
                      src={uploadImg}
                      alt=""
                    />
                    <span className="p-2" style={{ color: "#39C6B5" }}>
                      Upload
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row p-2">
          <div className="titleBar d-flex shapeParent mt-5 ">
            <div className="shape" style={{ height: "25px" }}></div>
            <h2 className="fs-5 ms-4">Uploaded Documents</h2>
          </div>
          <div className="d-flex flex-wrap column-gap-5 p-3">
            {data?.files.length ? (
              data?.files?.map((item) => <p>📜{item.attachment_type}</p>)
            ) : (
              <p className="text-danger fw-bold">
                * No documents uploaded. Kindly upload your documents to
                complete your profile
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
