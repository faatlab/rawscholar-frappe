import React, { useEffect } from "react";
import Logo from "../../assets/Logo.svg";
import { Link } from "react-router-dom";


function Terms({ setShow }) {
  useEffect(() => {
    setShow(false);
  });
  return (
    <div className="container" style={{ fontSize: "12px" }}>
      <div className="d-flex justify-content-center p-4">
        <img alt="Logo" src={Logo} height="50" className="" />
      </div>
      <div className="border shadow p-5" style={{ borderRadius: "10px" }}>
        <p
          className="p-4 fw-bold d-flex justify-content-center"
          style={{ fontSize: "16px" }}
        >
          Terms and Conditions of Rawscholar
        </p>
        <p className="container p-4">
          Welcome to rawscholar These Terms and Conditions govern your use of
          our website and services. By accessing or using our website, you agree
          to comply with these Terms and Conditions. If you do not agree with
          these terms, please do not use our website.
        </p>
        <p className="p-3 fw-bold container">How We Use Your Information</p>
        <ul>
          <p className=" fw-bold container">Use of Website</p>
          <li className="p-2">
            1. Access: You may use our website for your personal and
            non-commercial purposes. You must be at least 18 years old to use
            our services unless supervised by a legal guardian.
          </li>
          <li className="p-2">
            2. Accuracy: While we strive to provide accurate and up-to-date
            information, we do not warrant the completeness or accuracy of the
            content on our website. We reserve the right to modify or update the
            information on our website at any time without prior notice.
          </li>
          <li className="p-2">
            3. Prohibited Activities: You agree not to engage in any of the
            following prohibited activities:
          </li>
          <p className=" fw-bold container p-2">Services</p>
          <li className="p-2">
            1. Service Description: We provide information and services related
            to studying abroad, including educational programs, application
            assistance, and consultation.
          </li>
          <li className="p-2">
            2. Third-Party Services: Our website may contain links to
            third-party websites or services. We are not responsible for the
            content or practices of these third-party sites. Your use of
            third-party services is subject to their respective terms and
            policies.
          </li>
          <p className=" fw-bold container p-2"> User Content</p>
          <li className="p-2">
            1.Submission: You may submit content, such as reviews or
            testimonials, to our website. By submitting content, you grant us a
            non-exclusive, royalty-free, perpetual, irrevocable, and fully
            sublicensable right to use, reproduce, modify, adapt, publish,
            translate, create derivative works from, distribute, and display
            such content worldwide.
          </li>
          <li className="p-2">
            2.Responsibility: You are solely responsible for the content you
            submit to our website. You agree not to submit content that is
            unlawful, defamatory, libelous, obscene, threatening, invasive of
            privacy, infringing of intellectual property rights, or otherwise
            objectionable.
          </li>
          <p className=" fw-bold container p-2">Privacy Policy</p>
          <li className="p-2">
            1.Privacy: Your use of our website is also governed by our Privacy
            Policy. By using our website, you consent to the collection, use,
            and disclosure of your personal information as described in our
            Privacy Policy.
          </li>
          <li className="p-2">
            2.Responsibility: You are solely responsible for the content you
            submit to our website. You agree not to submit content that is
            unlawful, defamatory, libelous, obscene, threatening, invasive of
            privacy, infringing of intellectual property rights, or otherwise
            objectionable.
          </li>
          <li className="p-2">
            3.Ownership: All content and materials on our website, including
            text, graphics, logos, images, and software, are the property of
            Rawscholar or its licensors and are protected by intellectual
            property laws.
          </li>
          <li className="p-2">
            4.License: You are granted a limited, non-exclusive,
            non-transferable license to access and use our website and its
            content for personal, non-commercial purposes only.
          </li>
          <p className=" fw-bold container p-2">Limitation of Liability</p>
          <li className="p-2">
            1. Disclaimer: Our website and services are provided on an "as is"
            and " as available " basis without warranties of any kind, either
            express or implied. We do not warrant that our website will be
            uninterrupted, secure, or error-free.
          </li>
          <li className="p-2">
            2. Limitation: In no event shall Rawscholar be liable for any
            indirect, incidental, special, consequential, or punitive damages
            arising out of or in connection with your use of our website or
            services.
          </li>
          <p className=" fw-bold container p-2">Governing Law</p>
          <li className="p-2">
            1. Jurisdiction:These Terms and Conditions shall be governed by and
            construed in accordance with the laws of [Your Jurisdiction],
            without regard to its conflict of law principles.
          </li>
          <p className=" fw-bold container p-2">Changes to Terms</p>
          <li className="p-2">
            1. Modification: We reserve the right to modify or update these
            Terms and Conditions at any time. Changes will be effective
            immediately upon posting on our website. Your continued use of our
            website after any such changes constitutes your acceptance of the
            revised Terms and Conditions.
          </li>
          <p className=" fw-bold container p-2">Contact Us</p>
          <li className="p-2 ">
            1.Questions: If you have any questions about these Terms and Conditions, please contact us at  <Link style={{color:"blue"}} >rawscholar@gmail.com.</Link>.
          </li>
        </ul>
      </div>
        <br />
    </div>
  );
}

export default Terms;
