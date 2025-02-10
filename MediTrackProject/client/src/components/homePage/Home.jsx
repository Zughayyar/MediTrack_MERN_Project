import image from "../../images/MediTrackerLogo.png";
import "../../styles/Home.css";
import TopBar from "./TopBar";

const Home = () => {
  return (
    <>
      <TopBar />
      <div className="container">
        <div className="text-container">
          <p className="title">Idea Overview</p>
          <p style={{ fontSize: "21px", marginLeft: "20px", color: "black" }}>
 Meditracker is a comprehensive healthcare management system designed to enhance the operational efficiency of clinics by effectively managing roles, medical data, appointments, and prescriptions. The platform divides responsibilities across different clinic roles, ensuring clear access control and streamlined operations for practitioners, nurses, and assistants.
          </p>
          <br />
          <ul>
            <li>
              <strong>Role-Based Access Control:</strong> Different access levels for
              Practitioners, Nurses, and Assistants.
            </li>
            <br />
            <li>
              <strong>Medical Data Management:</strong> Storage and management of
              general medical history and visit notes.
            </li>
            <br />
            <li>
              <strong>Appointment Management:</strong> Features for booking, scheduling,
              and tracking estimated wait times.
            </li>
            <br />
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
