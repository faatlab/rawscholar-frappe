import { useNavigate } from "react-router-dom";
import { useFrappeGetDocList } from "frappe-react-sdk";
import { useContext, useEffect } from "react";
import { countryContext } from "../../Components/ContextShare";

function Countries({ setShow }) {
   useEffect(() => {
      setShow(true);
   });

   const { data, error } = useFrappeGetDocList("Countries", {
      fields: ["name", "image"],
   });
   console.log(data, error);
   const { setCountryData } = useContext(countryContext);
   const navigate = useNavigate();
   const goToCountry = (country) => {
      setCountryData(country);
      navigate("/universities");
   };

   return (
      <section id="countriesSection" className="container">
         <div className="countriesContainer shapeParent">
            <div className="my-5">
               <div className="shape"></div>
               <h3 className="ms-4">Countries</h3>
            </div>
            <div className="d-flex flex-wrap justify-content-evenly align-items-center column-gap-3 my-5">
               {data?.map((country) => (
                  <div
                     onClick={() => goToCountry(country)}
                     style={{ textDecoration: "none", width: "250px" }}
                     key={country.name}
                  >
                     <div>
                        <img
                           src={
                              data?.country?.image
                                 ? `https://rawscholar1.frappe.cloud${country.image}`
                                 : ""
                           }
                           width={250}
                           alt={`${country.name} pic`}
                           className="rounded border"
                        />
                        <div className="title text-center">
                           <p>{country.name}</p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
}

export default Countries;
