import { useContext, useEffect, useState } from "react";
import { courseContext, searchContext } from "../../Components/ContextShare";
import { useFrappeGetDocList } from "frappe-react-sdk";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

import notFound from "../../assets/notFound.svg";

function Search({ setShow }) {
  useEffect(() => {
    setShow(true);
  });
  const { searchTerm } = useContext(searchContext);
  const { setCourseData } = useContext(courseContext);
  const [searchData, setSearchData] = useState([]);
  const navigate = useNavigate();

  const { data, isLoading } = useFrappeGetDocList("Courses", {
    fields: [
      "name",
      "course",
      "university",
      "duration",
      "mode",
      "fee",
      "level",
    ],
    limit: 34820,
  });

  useEffect(() => {
    if (searchTerm != "") getSearchData();
  }, [data, searchTerm]);

  const getSearchData = () => {
    setSearchData(
      data?.filter((item) =>
        item.course
          .replace(/[,.]+/g, "")
          .trim()
          .toLowerCase()
          .includes(searchTerm)
      )
    );
    if (searchData == []) setSearchData([]);
  };

  const gotoCourse = (course) => {
    if (!localStorage.getItem("userData")) {
      navigate("/login");
      toast.warning("Please login or sign-up before continuing");
    } else {
      setCourseData(course);
      navigate("/university/course");
    }
  };

  return (
    <section id="searchContainer">
      <div className="container">
        <div className="searchTitle mt-5">
          <p className="text-secondary fs-5">
            Showing results for : <mark>&ldquo;{searchTerm}&ldquo;</mark>
          </p>
        </div>
        {isLoading ? (
          <div style={{ height: "50vh" }} className="d-flex justify-content-center align-items-center">
            <BeatLoader color="#39C6B5" size={20}/>
          </div>
        ) : (
          <div>
            {searchData?.length == 0 ? (
              <div className="d-flex flex-column align-items-center justify-content-center text-center fs-4 my-5 py-5">
                <img
                  src={notFound}
                  alt="not found"
                  height={180}
                  className="mb-2"
                />
                <p>Sorry, no items were found for your search</p>
                <p>Please try again</p>
              </div>
            ) : (
              <div>
                <div>
                  <div className="courseContainer d-flex justify-content-between gap-5 flex-wrap py-5 px-2">
                    {searchData?.map((course) => (
                      <div
                        className="courseCard rounded shadow p-5 col-lg-5"
                        key={course.name}
                        onClick={() => gotoCourse(course)}
                      >
                        <div className="courseTitle mb-4 fw-bold">
                          <h5 className="fw-bold">{course.course}</h5>
                          <p>{course.university}</p>
                        </div>
                        <div className="courseContent row">
                          <div className="col-3">
                            <span style={{ color: "#067BC2" }}>Duration</span>
                            <p style={{ color: "gray" }}>{course.duration}</p>
                          </div>
                          <div className="col-6">
                            <span style={{ color: "#067BC2" }}>
                              1st Year Tuition Fees
                            </span>
                            <p style={{ color: "gray" }}>{course.fee}</p>
                          </div>
                          <div className="col-3">
                            <span style={{ color: "#067BC2" }}>Level</span>
                            <p style={{ color: "gray" }}>{course.mode}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Search;
