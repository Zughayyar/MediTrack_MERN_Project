import React from "react";
import TopBar from "./TopBar";
import "../Styles/AboutUs.css"; // Include your custom CSS

const AboutUs = () => {
  return (
    <>
      <TopBar />
      <div className="about-us-container">
        <div className="about-us-card">
          <h1 className="about-us-heading">About Us</h1>
          <p className="about-us-text">
            Welcome to <span className="highlight-text">MediTraker</span>, your trusted healthcare appointment management system. Our mission is to simplify the way patients, doctors, and healthcare facilities manage medical appointments, prescriptions, and patient records.
          </p>

          <h2 className="about-us-subheading">Who We Are</h2>
          <p className="about-us-text">
            MediTraker is a cutting-edge platform designed to enhance healthcare efficiency by reducing wait times, improving patient care, and streamlining medical workflows.
          </p>

          <h2 className="about-us-subheading">What We Offer</h2>
          <ul className="about-us-list">
            <li className="about-us-list-item">
              <span className="highlight-text">Easy Appointment Booking</span> – Effortless scheduling and management.
            </li>
            <li className="about-us-list-item">
              <span className="highlight-text">Real-Time Wait Time Tracking</span> – Stay updated before visiting.
            </li>
            <li className="about-us-list-item">
              <span className="highlight-text">Secure Medical Data Management</span> – Safe handling of patient records.
            </li>
            <li className="about-us-list-item">
              <span className="highlight-text">Prescription Management</span> – Digital prescriptions with easy access.
            </li>
            <li className="about-us-list-item">
              <span className="highlight-text">Role-Based Access</span> – Custom dashboards for doctors, nurses, and assistants.
            </li>
          </ul>

          <h2 className="about-us-subheading">Our Vision</h2>
          <p className="about-us-text">
            To revolutionize healthcare accessibility through smart digital solutions, ensuring a smooth experience for both patients and healthcare providers.
          </p>

          <h2 className="about-us-subheading">Our Commitment</h2>
          <p className="about-us-text">
            We prioritize <span className="highlight-text">security, efficiency, and ease of use</span>, making healthcare management simple and hassle-free. Your health matters, and we are here to help you every step of the way.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
