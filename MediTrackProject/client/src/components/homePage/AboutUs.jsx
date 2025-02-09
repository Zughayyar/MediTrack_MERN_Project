import TopBar from "./TopBar";
import "../../styles/AboutUs.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const teamMembers = [
  { name: "Sami", role: "FrontEnd Developer", image: "https://i.ibb.co/4kbc7mM/unnamed-removebg-preview.png"},
  { name: "Mohammad Al-Turk", role: "Lead Developer", image: "https://trello-members.s3.amazonaws.com/673c5602aee922fd51bafa87/c31a31e558be043b197381306668eb3a/170.png" },
  { name: "Yasser Alzoubi", role: "FrontEnd Developer", image: "https://i.ibb.co/HTTNXLtC/download-1.png" },
  { name: "Anas Zughayyar", role: "Backend Developer", image: "https://i.ibb.co/jvPq32NC/image-2025-02-09-100326579.png" },
];

const AboutUs = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

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

          <h2 className="about-us-subheading">Our Team</h2>
          <Slider {...sliderSettings} className="team-slider">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member">
                <img src={member.image} alt={member.name} className="team-image" />
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
