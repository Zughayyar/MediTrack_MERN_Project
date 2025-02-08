import React from "react";
import { Link } from "react-router-dom";
import image from "../Pics/undefinedd.png";
import "../Styles/Home.css";
import TopBar from "./TopBar"; // Import TopBar component

const Home = () => {
  return (
    <>
      <TopBar /> {/* Add TopBar at the top */}
      <div className="container">
        <div className="text-container">
          <p className="title">Idea Overview</p>
          <p style={{ fontSize: "21px", marginLeft: "20px" , color:" black"}}>
            Meditracker is a healthcare appointment management system
            designed to streamline medical appointment booking, track
            estimated wait times, and enhance the operational efficiency of
            healthcare facilities. The system aims to provide a seamless
            experience for both patients and healthcare professionals
            through an intuitive and efficient digital platform.
          </p><br />  
          <ul>
            <li>
              <strong>Role-Based Access Control:</strong> Different access levels for
              Practitioners, Nurses, and Assistants.
            </li> <br />
            <li>
              <strong>Medical Data Management:</strong> Storage and management of
              general medical history and visit notes.
            </li><br />
            <li>
              <strong>Appointment Management:</strong> Features for booking, scheduling,
              and tracking estimated wait times.
            </li><br />
            <li>
              <strong>Prescription Management:</strong> Ability to generate prescriptions,
              export them as PDFs, and send them via email.
            </li>
          </ul>
        </div>

        <div className="phone-frame">
          <div className="logo-phone">
            <img
              alt="Logo of a running person with Arabic text below"
              height="100"
              src={image}
              width="100"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
