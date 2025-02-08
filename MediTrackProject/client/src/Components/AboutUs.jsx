import React from "react";
import TopBar from "./TopBar";

const AboutUs = () => {
  return (
    <>
    <TopBar/>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-4xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">About Us</h1>
        <p className="text-gray-700 mb-6">
          Welcome to <span className="font-semibold">MediTraker</span>, your trusted healthcare appointment management system. Our mission is to simplify the way patients, doctors, and healthcare facilities manage medical appointments, prescriptions, and patient records.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Who We Are</h2>
        <p className="text-gray-700 mb-6">
          MediTraker is a cutting-edge platform designed to enhance healthcare efficiency by reducing wait times, improving patient care, and streamlining medical workflows.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-3">What We Offer</h2>
        <ul className="list-disc pl-5 text-gray-700 mb-6">
          <li><span className="font-semibold">Easy Appointment Booking</span> – Effortless scheduling and management.</li>
          <li><span className="font-semibold">Real-Time Wait Time Tracking</span> – Stay updated before visiting.</li>
          <li><span className="font-semibold">Secure Medical Data Management</span> – Safe handling of patient records.</li>
          <li><span className="font-semibold">Prescription Management</span> – Digital prescriptions with easy access.</li>
          <li><span className="font-semibold">Role-Based Access</span> – Custom dashboards for doctors, nurses, and assistants.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Our Vision</h2>
        <p className="text-gray-700 mb-6">
          To revolutionize healthcare accessibility through smart digital solutions, ensuring a smooth experience for both patients and healthcare providers.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Our Commitment</h2>
        <p className="text-gray-700">
          We prioritize <span className="font-semibold">security, efficiency, and ease of use</span>, making healthcare management simple and hassle-free. Your health matters, and we are here to help you every step of the way.
        </p>
      </div>
    </div>
    </>
  );
};

export default AboutUs;
