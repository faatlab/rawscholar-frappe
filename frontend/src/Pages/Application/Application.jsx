import { useFrappeGetDocList } from "frappe-react-sdk";
import { useEffect } from "react";

import notFound from "../../assets/notFound.svg";

function Application({ setShow }) {
  useEffect(() => {
    setShow(true);
  });
  let loggedData = JSON.parse(localStorage.getItem("userData"));
  const { data } = useFrappeGetDocList("Application", {
    fields: ["name", "student", "country", "university", "course", "status"],
    filters: [["student", "=", loggedData.name1]],
  });

  console.log(data);
  return (
    <div className="container my-5">
      <div className="titleBar d-flex shapeParent">
        <div className="shape"></div>
        <h1 className="fs-4 ms-4">Applications</h1>
      </div>
      {data?.length > 0 ? (
        <div className="applicationCardContainer m-lg-5 d-flex flex-column justify-content-center align-items-center">
          {data?.map((item) => (
            <div
              className="shadow-sm border rounded mb-4"
              style={{ width: "75%" }}
            >
              <p
                className="py-1 px-2 ms-auto"
                style={{
                  backgroundColor:"#39C6B5",
                  width: "120px",
                  borderRadius: "0px 7px 0px 7px",
                }}
              >
                {item.status}
              </p>
              <div className="px-5 pb-5 ">
                <h5 style={{ color: "#067BC2" }}>In {item.country}</h5>
                <h3 className="fw-bold">{item.course}</h3>
                <h4 style={{ color: "gray" }}>{item.university}</h4>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center fs-4 my-5 py-5">
          <img src={notFound} alt="not found" height={180} className="mb-2" />
          <p>You have no applications</p>
        </div>
      )}
    </div>
  );
}

export default Application;
