import { useState } from "react";
import styles from "./patientprofile.module.css";
import { mylink } from './link';
import PropTypes from "prop-types";

const PatientProfileCard = () => {
  const [reports, setReports] = useState([]);
  const [formData, setFormData] = useState({
    name: "Yash Jain",
    email: "yashjain6099@gmail.com",
    mobile: "9301695345",
    age: 20,
    gender: "M",
    date_of_birth: "04/07/2004",
    doctor_hospital: "City Hospital",
    blood: "O+",
    address: "vaishali nagar bhopal 462003",
    date: "09-08-09",
    docid: "docid",
    password: "docid",
    timeslot: "11:00AM-1:00PM",
  });

  console.log(setFormData);
  const handleAddReport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newReport = URL.createObjectURL(file);
      setReports([...reports, newReport]);
    }
  };

  const handleOn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${mylink}/patientlog`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }
      const data = await response.json();
      console.log("Success:", data);
      setFormData(data);
      // Handle success logic here (e.g., show a success message)
    } catch (error) {
      console.error("Error: fvnsgfn", error);
      // Handle error logic here (e.g., show an error message)
    }
  };
  handleOn();

  return (
    <div className={styles.ppc}>
      <div className={styles.card}>
        <img
          className={styles.patientimage}
          src="https://uxwing.com/wp-content/themes/uxwing/download/health-sickness-organs/hospital-patient-icon.png"
          alt=""
        />
        <h2 className={styles.name}>{formData.name}</h2>

        <div className={styles.infoContainer}>
          <div className={styles.info}>
            <span className={styles.label}>Email:</span>
            <span className={styles.value}>{formData.email}</span>
          </div>
          <div className={styles.info}>
            <span className={styles.label}>Mobile No:</span>
            <span className={styles.value}>{formData.mobile}</span>
          </div>
          <div className={styles.info}>
            <span className={styles.label}>Age:</span>
            <span className={styles.value}>{formData.age}</span>
          </div>
          <div className={styles.info}>
            <span className={styles.label}>Gender:</span>
            <span className={styles.value}>{formData.gender}</span>
          </div>
          {/* <div className={styles.info}>
          <span className={styles.label}>Marital Status:</span>
          <span className={styles.value}>{formData.marital}</span>
        </div> */}
          <div className={styles.info}>
            <span className={styles.label}>Blood Group:</span>
            <span className={styles.value}>{formData.blood}</span>
          </div>
          <div className={styles.info}>
            <span className={styles.label}>Date of Birth:</span>
            <span className={styles.value}>{formData.date_of_birth}</span>
          </div>
          <div className={styles.info}>
            <span className={styles.label}>Address:</span>
            <span className={styles.value}>{formData.address}</span>
          </div>
          <div className={styles.info}>
            <span className={styles.label}>Doctor:</span>
            <span className={styles.value}>{formData.doctor_hospital}</span>
          </div>
          <div className={styles.info}>
            <span className={styles.label}>Patient Queue:</span>
            <span className={styles.value}>12</span>
          </div>
          <div className={styles.info}>
            <span className={styles.label}>Time Slot:</span>
            <span className={styles.value}>{formData.timeslot}</span>
          </div>
        </div>

        <div className={styles.addReport}>
          <label htmlFor="uploadReport" className={styles.uploadBtn}>
            Add Reports
          </label>
          <input
            type="file"
            id="uploadReport"
            className={styles.fileInput}
            onChange={handleAddReport}
            accept="image/*"
          />
        </div>

        <div className={styles.reportsSection}>
          {reports.length > 0 && <h3>Patient Reports:</h3>}
          <div className={styles.reportImages}>
            {reports.map((report, index) => (
              <img
                key={index}
                src={report}
                alt={`Patient Report ${index + 1}`}
                className={styles.reportImage}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

PatientProfileCard.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    gender: PropTypes.string.isRequired,
    date_of_birth: PropTypes.string.isRequired,
    doctor_hospital: PropTypes.string.isRequired,
    blood_group: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    docid: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    timeslot: PropTypes.string.isRequired,
  }).isRequired,
};
export default PatientProfileCard;
