import { Link, useNavigate } from "react-router-dom";

import heroImage from "../../assets/heroImg.png";
import find2 from "../../assets/find2.png";
import passport2 from "../../assets/passport2.png";
import diploma2 from "../../assets/diploma2.png";
import germany from "../../assets/flags/germany.png";
import france from "../../assets/flags/france.png";
import uk from "../../assets/flags/uk.png";
import ireland from "../../assets/flags/ireland.png";
import university1 from "../../assets/universities/university1.svg";
import university2 from "../../assets/universities/university2.svg";
import university3 from "../../assets/universities/university3.svg";
import university4 from "../../assets/universities/university4.svg";

import styles from "./Home.module.css";
import { useContext, useEffect } from "react";
import { countryContext } from "../../Components/ContextShare";

function Home({ setShow }) {
   useEffect(() => {
      setShow(true);
   });

   let loggedData = JSON.parse(localStorage.getItem("userData"));

   const { setCountryData } = useContext(countryContext);
   const navigate = useNavigate();
   const goToCountry = (country) => {
      setCountryData(country);
      navigate("/universities");
   };

   return (
      <>
         <section id="heroContainer" className="container">
            <div className={styles.hero}>
               <div className={styles.heroContent}>
                  <div className={styles.heroText}>
                     <p style={{ color: "#39C6B5" }}>Ignite</p>
                  </div>
                  <div className={styles.heroText}>
                     <p>Your academic</p>
                     <p>Journey</p>
                     {loggedData ? (
                        ""
                     ) : (
                        <Link to="/signup" className={styles.signup}>
                           Sign Up
                        </Link>
                     )}
                  </div>
               </div>
               <div className={styles.heroImageDiv}>
                  <img src={heroImage} alt="Hero" />
               </div>
            </div>
         </section>
         <section className="working container  pt-5">
            <div className="cardContainer my-5 gap-5 d-lg-flex row-gap-3">
               <div
                  className="d-flex align-items-center gap-4 p-3 shadow mb-4"
                  style={{ borderRadius: "10px" }}
               >
                  <img src={find2} height="60" alt="card 1" />
                  <div>
                     <h5 className={styles.cardHeading}>Courses for you</h5>
                     <p className={styles.cardText}>
                        We will take you to the courses that are perfect for
                        you. All you have to do is send your applications and
                        look up to your dream course.
                     </p>
                  </div>
               </div>
               <div
                  className="d-flex align-items-center gap-4 p-3 shadow mb-4"
                  style={{ borderRadius: "10px" }}
               >
                  <img src={passport2} height="60" alt="card 2" />
                  <div>
                     <h5 className={styles.cardHeading}>Get your visa</h5>
                     <p className={styles.cardText}>
                        The procedures of visas might be tiring. We will be
                        there to assist you from arranging a mockup interview to
                        getting an actual one and more.
                     </p>
                  </div>
               </div>
               <div
                  className="d-flex align-items-center gap-4 p-3 shadow mb-4"
                  style={{ borderRadius: "10px" }}
               >
                  <img src={diploma2} height="60" alt="card 3" />
                  <div>
                     <h5 className={styles.cardHeading}>Scholarships</h5>
                     <p className={styles.cardText}>
                        Get the right scholarship you deserve. We will take you
                        to the immense opportunities of scholarship for a
                        brighter future.
                     </p>
                  </div>
               </div>
            </div>
            <div className="row mb-5 row-gap-4">
               <div className="col-lg-6">
                  <div style={{ height: "320px" }}>
                     <iframe
                        width="100%"
                        height="100%"
                        style={{ borderRadius: "10px" }}
                        className="shadow"
                        src="https://www.youtube.com/embed/QfBasFOvhyI?si=VPPZBM6Pph3J-WQ6"
                        title="YouTube video player"
                     ></iframe>
                  </div>
               </div>
               <div className="col-lg-6">
                  <div
                     className="h-100 py-4 px-5 shadow shapeParent"
                     style={{ borderRadius: "10px" }}
                  >
                     <div className="d-flex">
                        <div className="shape"></div>
                        <h5 className="fs-4" style={{ fontWeight: "600" }}>
                           How it works
                        </h5>
                     </div>
                     <div className="d-flex align-items-center mt-4">
                        <p className="mb-0">
                           Raw Scholar is available to all students who wish to
                           study abroad. Raw scholar is India’s 1st all
                           inclusive platform in India designed to guide
                           students in their college application process to
                           universities and colleges abroad. Raw scholar is not
                           our name. Its the name given to all the students is
                           alumni of Raw scholar. You became a Raw scholar from
                           the moment you entered this platform
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <section className="services container">
            <div className="countriesContainer ">
               <div className={`${styles.titleBar} d-flex shapeParent`}>
                  <div className="shape"></div>
                  <h2 className="fs-4 ms-4">Major Countries</h2>
                  <Link
                     to="/countries"
                     className={`${styles.titleTag} ms-auto py-2 px-3 shadow`}
                  >
                     View all Countries
                  </Link>
               </div>
               <div className="countriesList d-lg-flex flex-wrap text-center justify-content-between">
                  <div>
                     <img
                        src={germany}
                        alt="germany"
                        width="250"
                        className={styles.flag}
                        onClick={() => goToCountry({ name: "Germany" })}
                     />
                     <p>Germany</p>
                  </div>
                  <div>
                     <img
                        src={ireland}
                        alt="ireland"
                        width="250"
                        className={styles.flag}
                        onClick={() => goToCountry({ name: "Ireland" })}
                     />
                     <p>Ireland</p>
                  </div>
                  <div>
                     <img
                        src={france}
                        alt="france"
                        width="250"
                        className={styles.flag}
                        onClick={() => goToCountry({ name: "France" })}
                     />
                     <p>France</p>
                  </div>
                  <div>
                     <img
                        src={uk}
                        alt="uk"
                        width="250"
                        className={styles.flag}
                        onClick={() => goToCountry({ name: "UK" })}
                     />
                     <p>UK</p>
                  </div>
               </div>
            </div>

            {/* Major University */}

            <div className="universityContainer my-5">
               <div className={`${styles.titleBar} d-flex shapeParent`}>
                  <div className="shape"></div>
                  <h2 className="fs-4 ms-4">Major University</h2>
                  <Link
                     to="/universities"
                     className={`${styles.titleTag} ms-auto py-2 px-3 shadow`}
                  >
                     View all University
                  </Link>
               </div>
               <div className="universityList d-lg-flex flex-wrap gap-5">
                  <div
                     className={`${styles.universityCard} shadow p-3 m-auto mb-3`}
                     style={{ width: "18rem", borderRadius: "10px" }}
                  >
                     <img
                        src={university1}
                        alt="university1"
                        style={{ width: "100%" }}
                        className="rounded mb-3"
                     />
                     <p className={styles.universityTitle}>In USA</p>
                     <p className={styles.universityFname}>
                        Massachusetts Institute of Technology (MIT)
                     </p>
                  </div>
                  <div
                     className={`${styles.universityCard} shadow p-3 rounded m-auto mb-3`}
                     style={{ width: "18rem", borderRadius: "10px" }}
                  >
                     <img
                        src={university2}
                        alt="university1"
                        style={{ width: "100%" }}
                        className="rounded mb-3"
                     />
                     <p className={styles.universityTitle}>In USA</p>
                     <p className={styles.universityFname}>
                        Massachusetts Institute of Technology (MIT)
                     </p>
                  </div>
                  <div
                     className={`${styles.universityCard} shadow p-3 rounded m-auto mb-3`}
                     style={{ width: "18rem", borderRadius: "10px" }}
                  >
                     <img
                        src={university3}
                        alt="university1"
                        style={{ width: "100%" }}
                        className="rounded mb-3"
                     />
                     <p className={styles.universityTitle}>In USA</p>
                     <p className={styles.universityFname}>
                        Massachusetts Institute of Technology (MIT)
                     </p>
                  </div>
                  <div
                     className={`${styles.universityCard} shadow p-3 rounded m-auto mb-3`}
                     style={{ width: "18rem", borderRadius: "10px" }}
                  >
                     <img
                        src={university4}
                        alt="university1"
                        style={{ width: "100%" }}
                        className="rounded mb-3"
                     />
                     <p className={styles.universityTitle}>In USA</p>
                     <p className={styles.universityFname}>
                        Massachusetts Institute of Technology (MIT)
                     </p>
                  </div>
               </div>
            </div>

            {/* aboutus */}

            <div
               className="aboutusContainer shadow"
               style={{ borderRadius: "10px" }}
            >
               <div
                  className={`${styles.titleBar} d-flex py-4 m-0 shapeParent`}
               >
                  <div className="shape"></div>
                  <h2 className="fs-4 ms-4">About Us</h2>
               </div>
               <p className="aboutusText px-5 pb-5">
                  We aim for the upliftment of a community with better
                  opportunities. Studying abroad might be a distant dream for
                  you because of the huge amount you have to pay as a commission
                  for middlemen and other financial requirements. We are here to
                  take you to the heights you deserve with no monetary
                  constraints. If you’ve been thinking about studying abroad
                  options, let’s work together to find a suitable course,
                  country and university for you.
               </p>
            </div>

            {/* Most popular University */}

            <div className="universityContainer my-5">
               <div className={`${styles.titleBar} d-flex shapeParent`}>
                  <div className="shape"></div>
                  <h2 className="fs-4 ms-4">Popular Universities</h2>
                  <Link
                     to="/universities"
                     className={`${styles.titleTag} ms-auto py-2 px-3 shadow`}
                  >
                     View all University
                  </Link>
               </div>
               <div className="universityList d-lg-flex justify-content-between gap-5">
                  <div
                     className={`${styles.universityCard} shadow p-3 rounded m-auto mb-3`}
                     style={{ width: "18rem", borderRadius: "10px" }}
                  >
                     <img
                        src={university1}
                        alt="university1"
                        style={{ width: "100%" }}
                        className="rounded mb-3"
                     />
                     <p className={styles.universityTitle}>In USA</p>
                     <p className={styles.universityFname}>
                        Massachusetts Institute of Technology (MIT)
                     </p>
                  </div>
                  <div
                     className={`${styles.universityCard} shadow p-3 rounded m-auto mb-3`}
                     style={{ width: "18rem", borderRadius: "10px" }}
                  >
                     <img
                        src={university2}
                        alt="university1"
                        style={{ width: "100%" }}
                        className="rounded mb-3"
                     />
                     <p className={styles.universityTitle}>In USA</p>
                     <p className={styles.universityFname}>
                        Massachusetts Institute of Technology (MIT)
                     </p>
                  </div>
                  <div
                     className={`${styles.universityCard} shadow p-3 rounded m-auto mb-3`}
                     style={{ width: "18rem", borderRadius: "10px" }}
                  >
                     <img
                        src={university3}
                        alt="university1"
                        style={{ width: "100%" }}
                        className="rounded mb-3"
                     />
                     <p className={styles.universityTitle}>In USA</p>
                     <p className={styles.universityFname}>
                        Massachusetts Institute of Technology (MIT)
                     </p>
                  </div>
                  <div
                     className={`${styles.universityCard} shadow p-3 rounded m-auto mb-3`}
                     style={{ width: "18rem", borderRadius: "10px" }}
                  >
                     <img
                        src={university4}
                        alt="university1"
                        style={{ width: "100%" }}
                        className="rounded mb-3"
                     />
                     <p className={styles.universityTitle}>In USA</p>
                     <p className={styles.universityFname}>
                        Massachusetts Institute of Technology (MIT)
                     </p>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
}

export default Home;
