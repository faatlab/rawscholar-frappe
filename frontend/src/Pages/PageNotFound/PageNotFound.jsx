import { useEffect } from "react";
import pageNotFound from "../../assets/pageNotFound.svg";
import { Link } from "react-router-dom";

function PageNotFound({ setShow }) {
  useEffect(() => {
    setShow(true);
  });
  return (
    <section id="notFoundSection">
      <div className="container text-center my-5 py-4">
        <img src={pageNotFound} alt="Page Not Found" />
        <h1
          style={{
            color: "#39C6B5",
            fontFamily: "Lilita One, sans-serif",
            fontSize: "90px",
          }}
        >
          404
        </h1>
        <p>Page Not Found</p>
        <Link to="/" className="btn btn-outline-info rounded-pill">
          Go Back Home
        </Link>
      </div>
    </section>
  );
}

export default PageNotFound;
