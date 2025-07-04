import { useNavigate } from "react-router-dom";
import university1 from "../../assets/universities/university1.svg";

import { useFrappeGetDocList } from "frappe-react-sdk";
import { useContext, useEffect, useState } from "react";
import {
  countryContext,
  universityContext,
} from "../../Components/ContextShare";

function Universities({ setShow }) {
  useEffect(() => {
    setShow(true);
  });

  const navigate = useNavigate();
  const [pageIndex, setPageIndex] = useState(0);
  const { setUniversityData } = useContext(universityContext);
  const { countryData } = useContext(countryContext);

  const { data } = useFrappeGetDocList("University", {
    fields: ["image", "country", "university", "location"],
    filters: countryData ? [["country", "=", countryData.name]] : [],
    limit_start: pageIndex,
    limit: 12,
  });

  const gotoUniversity = (university) => {
    setUniversityData(university);
    navigate("/university");
  };

  return (
    <section id="universitiesSection" className="container">
      <div className="universitiesContainer shapeParent my-5">
        <div className="my-5">
          <div className="shape"></div>
          <h3 className="ms-4">Universities</h3>
        </div>
        <div className="universityList d-flex justify-content-center align-items-center gap-3 flex-wrap">
          {data?.map((university, i) => (
            <div
              to="/university"
              style={{ textDecoration: "none", color: "black" }}
              key={i}
              onClick={() => gotoUniversity(university)}
            >
              <div
                className=" universitycard shadow p-3 rounded"
                style={{ width: "18rem", height: "16rem" }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "50%",
                  }}
                >
                  <img
                    src={university.image}
                    alt="university1"
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "contain",
                    }}
                    className="rounded mb-3"
                  />
                </div>
                <div className="pt-3">
                  <p className="unviversitytitile">In {university.country}</p>
                  <p className="universityfname">{university.university}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 d-flex justify-content-end">
          {pageIndex > 0 ? (
            <button
              onClick={() => setPageIndex(pageIndex - 12)}
              className="btn rounded-pill me-2"
              style={{
                width: "100px",
                backgroundColor: "#39C6B5",
                color: "white",
              }}
            >
              Previous
            </button>
          ) : (
            ""
          )}
          <button
            onClick={() => setPageIndex(pageIndex + 12)}
            className="btn rounded-pill"
            style={{
              width: "100px",
              backgroundColor: "#067BC2",
              color: "white",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

export default Universities;
