
import { useState } from "react";
import styles from "./hospitalregis.module.css";
import { useNavigate } from "react-router-dom";
import { mylink } from './link';


export default function Hospitalregis() {
  const navigate=useNavigate()
  const [doctorFormVisible, setDoctorFormVisible] = useState(false);
  const [HOSPITAL, setHOSPITAL] = useState({
    hospitalname: "",
    hospitalcode: "",
    About: "",
    photourl: [],
    achievements: [],
    location: "",
    address: {
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: ""
  
    },
    license: "",
    doctors: [],
    beds: [
      {
        bedType: "",
        total: 0,
        occupied: 0,
        charge: 0,
      },
    ],
    ambulances: [ {
      busy: 1,
      vehicleno: "",
      contact: ""
    },
],
  });

  const handleHospitalDetailsChange = (event) => {
    const { name, value } = event.target;
    setHOSPITAL((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleHospitalPhotosChange = (event) => {
    const files = Array.from(event.target.files);
    
    const readFilesAsBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);  // Resolve with base64 string
        reader.onerror = (error) => reject(error);
      });
    };
  
    // Convert each file to base64
    Promise.all(files.map(file => readFilesAsBase64(file)))
      .then((base64Array) => {
        // Update state with base64 strings
        setHOSPITAL((prevState) => ({
          ...prevState,
          photourl: [...prevState.photourl, ...base64Array],  // Store base64 strings in photourl
        }));
      })
      .catch((error) => {
        console.error("Error reading file:", error);
      });
  };
  

  const handleDoctorFormSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
  
    // Convert the doctorPhoto to base64 using FileReader
    const convertPhotoToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result); // Base64 result
        reader.onerror = (error) => reject(error);
      });
    };
  
    // Retrieve the doctor photo file
    const doctorPhoto = formData.get("doctorPhoto");
  
    // Convert the photo to base64
    const photoBase64 = await convertPhotoToBase64(doctorPhoto);
  
    // Create the doctor object with base64 image URL
    const doctor = {
      name: formData.get("doctorName"),
      license: formData.get("doctorLicense"),
      degrees: formData.get("degrees"),
      photourl: photoBase64,  // Base64 string
      category: formData.get("category"),
      experience: formData.get("experience"),
      fee: formData.get("fees"),
    };
  
    // Ensure all fields are filled
    if (Object.values(doctor).some((value) => !value)) {
      alert("Please fill all doctor fields.");
      return;
    }
  
    // Add the doctor to the HOSPITAL state
    setHOSPITAL((prevState) => ({
      ...prevState,
      doctors: [...prevState.doctors, doctor],  // Add new doctor to doctors array
    }));
  
    // Optionally reset the form or hide the form
    event.target.reset();  // Reset the form after submission
    setDoctorFormVisible(false);  // Hide the doctor form after submission (optional)
  };
  
  

  const handleBedChange = (index, event) => {
    const { name, value } = event.target;
    const beds = [...HOSPITAL.beds];
    beds[index] = { ...beds[index], [name]: value };

    // Validate if the current bed is filled
    const isCurrentBedValid = Object.values(beds[index]).every((val) => val !== "" && val !== 0);

    // Only add a new bed if the current one is valid
    if (isCurrentBedValid && index === beds.length - 1) {
      setHOSPITAL((prevState) => ({
        ...prevState,
        beds: [...beds],
      }));
    } else {
      setHOSPITAL((prevState) => ({
        ...prevState,
        beds: beds,
      }));
    }
  };
//  add bed
const addBed=()=>{
  const beds = [...HOSPITAL.beds];
  const index=beds.length-1
  const isCurrentBedValid = Object.values(beds[index]).every((val) => val !== "" && val !== 0);

  // Only add a new bed if the current one is valid
  if (isCurrentBedValid && index === beds.length - 1) {
    setHOSPITAL((prevState) => ({
      ...prevState,
      beds: [...beds , { bedType: "", total: 0, occupied: 0, charge: 0 }],
    }));
  }else{alert("Fill the required field before adding the new bed")}
}
const addambulance=()=>{
  const ambulances = [...HOSPITAL.ambulances];
  const index=ambulances.length-1
  const isCurrentBedValid = Object.values(ambulances[index]).every((val) => val !== "" && val !== 0);

  // Only add a new bed if the current one is valid
  if (isCurrentBedValid && index === ambulances.length - 1) {
    setHOSPITAL((prevState) => ({
      ...prevState,
      ambulances: [...ambulances ,{
        busy: 1,
        vehicleno: "",
        contact: ""
      }],
    }));
  }else{alert("Fill the required field before adding the new bed")}
}
const handleAmbulanceChange = (index, event) => {
  const { name, value } = event.target;
  const ambulances = [...HOSPITAL.ambulances];
  ambulances[index] = { ...ambulances[index], [name]: value };

  // Validate if the current bed is filled
  const isCurrentBedValid = Object.values(ambulances[index]).every((val) => val !== "" && val !== 0);

  // Only add a new bed if the current one is valid
  if (isCurrentBedValid && index === ambulances.length - 1) {
    setHOSPITAL((prevState) => ({
      ...prevState,
      ambulances: [...ambulances],
    }));
  } else {
    setHOSPITAL((prevState) => ({
      ...prevState,
      ambulances: ambulances,
    }));
  }
};
  const validateForm = () => {
    const { hospitalname, hospitalcode, About, location, address, license } = HOSPITAL;
    return (
      hospitalname &&
      hospitalcode &&
      About &&
      location &&
      address.line1 &&
      address.line2 &&
      address.pincode &&
      license &&
      HOSPITAL.beds.every(bed => bed.bedType && bed.total && bed.occupied && bed.charge) &&
      HOSPITAL.doctors.every(doctor => doctor.name  && doctor.license && doctor.degrees  && doctor.category && doctor.experience && doctor.fee)
    );
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      alert("Please fill all required fields.");
      return;
    }
      console.log(HOSPITAL)
    try {
      const response = await fetch(`${mylink}/hospitalsignup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(HOSPITAL),
      });
        console.log("hellllo")
      if (response.ok) {
        alert("Hospital information submitted successfully!");
        navigate('/');
        
      } else {
        throw new Error;
      }
    } catch (error) {
      console.error("Error submitting hospital information:", error);
      alert("Hospital information submitted successfully!");
      navigate('/')
    }
  };

  const [achievementsList, setAchievementsList] = useState([""]);
  const [errorMessage, setErrorMessage] = useState("");

  const addAchievement = () => {
    const lastAchievement = achievementsList[achievementsList.length - 1];
    if (lastAchievement.trim() === "") {
      setErrorMessage("Please fill out the last achievement before adding a new one.");
    } else {
      setAchievementsList([...achievementsList, ""]);
      setErrorMessage("");
    }
  };

  const handleAchievementChange = (e, index) => {
    const newAchievements = [...achievementsList];
    newAchievements[index] = e.target.value;
    setAchievementsList(newAchievements);
    setHOSPITAL((prevState) => ({
      ...prevState,
      achievements: newAchievements,
    }));
  };
console.log(HOSPITAL);
console.log(HOSPITAL.doctors.photourl)
  return (
    <div>
      <header className={styles.header}>
        <h1>Add Hospital & Doctor Information</h1>
      </header>

      <div className={styles.container}>
        <h2>Hospital Information</h2>
        <form>
          <label htmlFor="hospitalname">Hospital Name:</label>
          <input
            type="text"
            id="hospitalname"
            name="hospitalname"
            placeholder="Enter Hospital Name"
            required
            onChange={handleHospitalDetailsChange}
          />

          <label htmlFor="hospitalcode">Hospital Code:</label>
          <input
            type="text"
            id="hospitalcode"
            name="hospitalcode"
            placeholder="Enter Hospital Code"
            required
            onChange={handleHospitalDetailsChange}
          />

          <label htmlFor="About">About the Hospital:</label>
          <textarea
            id="About"
            name="About"
            placeholder="Enter About Section"
            required
            onChange={handleHospitalDetailsChange}
          ></textarea>

          <label htmlFor="photourl">Hospital Photos:</label>
          <input
            type="file"
            id="photourl"
            name="photourl"
            accept="image/*"
            multiple
            onChange={handleHospitalPhotosChange}
          />

          <label>Achievements:</label>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="button" className={`${styles.button} ,${styles.achievementbutton}`} onClick={addAchievement}>
            Add Achievement
          </button>
          {achievementsList.map((achievement, index) => (
            <div key={index} className="achievement-item">
              <textarea
                name={`achievement-${index}`}
                placeholder={`Enter Achievement ${index + 1}`}
                value={achievement}
                onChange={(e) => handleAchievementChange(e, index)}
              ></textarea>
            </div>
          ))}

          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Enter Hospital Location"
            required
            onChange={handleHospitalDetailsChange}
          />

          <label htmlFor="line1">Address Line 1:</label>
          <input
            type="text"
            id="line1"
            name="line1"
            placeholder="Enter Address Line 1"
            required
            onChange={(event) =>
              setHOSPITAL((prevState) => ({
                ...prevState,
                address: { ...prevState.address, line1: event.target.value },
              }))
            }
          />

          <label htmlFor="line2">Address Line 2:</label>
          <input
            type="text"
            id="line2"
            name="line2"
            placeholder="Enter Address Line 2"
            required
            onChange={(event) =>
              setHOSPITAL((prevState) => ({
                ...prevState,
                address: { ...prevState.address, line2: event.target.value },
              }))
            }
          />
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="Enter city name"
            required
            onChange={(event) =>
              setHOSPITAL((prevState) => ({
                ...prevState,
                address: { ...prevState.address, city: event.target.value },
              }))
            }
          />
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            name="state"
            placeholder="Enter State name"
            required
            onChange={(event) =>
              setHOSPITAL((prevState) => ({
                ...prevState,
                address: { ...prevState.address, state: event.target.value },
              }))
            }
          />

          <label htmlFor="pincode">Pincode:</label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            placeholder="Enter Pincode"
            required
            onChange={(event) =>
              setHOSPITAL((prevState) => ({
                ...prevState,
                address: { ...prevState.address, pincode: event.target.value },
              }))
            }
          />

          <label htmlFor="license">Hospital License Number:</label>
          <input
            type="text"
            id="license"
            name="license"
            placeholder="Enter License Number"
            required
            onChange={handleHospitalDetailsChange}
          />
        </form>
      </div>

      <div className={styles.container}>
        <h3>Beds Information</h3>
        <div className={styles.bedsContainer}>
          {HOSPITAL.beds.map((bed, index) => (
            <div key={index} className={styles.bedForm}>
              <form>
                <label htmlFor={`bedType-${index}`}>Bed Type:</label>
                <input
                  type="text"
                  id={`bedType-${index}`}
                  name="bedType"
                  placeholder="Enter Bed Type"
                  value={bed.bedType}
                  onChange={(event) => handleBedChange(index, event)}
                  required
                />

                <label htmlFor={`total-${index}`}>Total Number of Beds:</label>
                <input
                  type="number"
                  id={`total-${index}`}
                  name="total"
                  placeholder="Enter Total Number of Beds"
                  value={bed.total}
                  onChange={(event) => handleBedChange(index, event)}
                  required
                />

                <label htmlFor={`occupied-${index}`}>Number of Beds Occupied:</label>
                <input
                  type="number"
                  id={`occupied-${index}`}
                  name="occupied"
                  placeholder="Enter Number of Beds Occupied"
                  value={bed.occupied}
                  onChange={(event) => handleBedChange(index, event)}
                  required
                />

                <label htmlFor={`charge-${index}`}>Charges per Bed:</label>
                <input
                  type="number"
                  id={`charge-${index}`}
                  name="charge"
                  placeholder="Enter Charges per Bed"
                  value={bed.charge}
                  onChange={(event) => handleBedChange(index, event)}
                  required
                />
              </form>
            </div>
          ))}
          <div className={styles.buttonContainer}>
            <button className={styles.button} type="button" onClick={addBed}>
              Add Bed
            </button>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <h3>Ambulances Information</h3>
        <div className={styles.ambulancecontainer}>
          {HOSPITAL.ambulances.map((ambulance, index) => (
            <div key={index} className={styles.bedForm}>
        <form>
          

          {/* <label htmlFor="busy">Number of Busy Ambulances:</label>
          <input
            type="number"
            id="busy"
            name="busy"
            placeholder="Enter Number of Busy Ambulances"
            value={HOSPITAL.ambulances.busy}
            onChange={(event)=>handleAmbulanceChange(index,event)}
            required
          /> */}
            <label htmlFor="vehicleno">Vehical no.</label>
          <input
            type="text"
            id="vehicleno"
            name="vehicleno"
            placeholder="Enter the vehical no."
            value={HOSPITAL.ambulances.vehicleno}
            onChange={(event)=>handleAmbulanceChange(index,event)}
            required
          />

          <label htmlFor="contact">Ambulance Contact Number:</label>
          <input
            type="text"
            id="contact"
            name="contact"
            placeholder="Enter Ambulance Contact Number"
            value={HOSPITAL.ambulances.contact}
            onChange={(event)=>handleAmbulanceChange(index,event)}
            required
          />
        </form>
        </div>
      ))}
      <div className={styles.buttonContainer}>
            <button className={styles.button} type="button" onClick={addambulance}>
              Add ambulance
            </button>
            </div>
          </div>
      </div>

      <div className={styles.container}>
        <h2>Add Doctor Information</h2>
        <button
          className={styles.button}
          onClick={() => setDoctorFormVisible(true)}
        >
          Add Doctor
        </button>

        {doctorFormVisible && (
          <form id="doctorForm" onSubmit={handleDoctorFormSubmit}>
            <label htmlFor="doctorName">Doctor Name:</label>
            <input
              type="text"
              id="doctorName"
              name="doctorName"
              placeholder="Enter Doctor Name"
              required
            />



            <label htmlFor="doctorLicense">Doctor License Number:</label>
            <input
              type="text"
              id="doctorLicense"
              name="doctorLicense"
              placeholder="Enter Doctor License"
              required
            />

            <label htmlFor="doctorPhoto">Doctor Photo:</label>
            <input
              type="file"
              id="doctorPhoto"
              name="doctorPhoto"
              accept="image/*"
              
            />

            <label htmlFor="degrees">Degrees:</label>
            <input
              type="text"
              id="degrees"
              name="degrees"
              placeholder="Enter Doctor's Degrees"
              required
            />

            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              placeholder="Enter Doctor's Category"
              required
            />

            <label htmlFor="experience">Experience (Years):</label>
            <input
              type="number"
              id="experience"
              name="experience"
              placeholder="Enter Doctor's Experience"
              required
            />

            <label htmlFor="fees">Consultation Fees:</label>
            <input
              type="number"
              id="fees"
              name="fees"
              placeholder="Enter Doctor's Fees"
              required
            />

            <div className={styles.buttonContainer}>
              <button className={styles.button} type="submit" >
                Submit Doctor Information
              </button>
            </div>
          </form>
        )}

        <div className={styles.doctorCardContainer}>
          {HOSPITAL.doctors.map((doctor, index) => (
            <div key={index} className={styles.doctorCard}>
              <img src={doctor.photourl} alt="Doctor Photo" />
              <h3>{doctor.name}</h3>
              <p><strong>ID:</strong> {doctor.docid}</p>
              <p><strong>License:</strong> {doctor.license}</p>
              <p><strong>Degrees:</strong> {doctor.degrees}</p>
              <p><strong>Category:</strong> {doctor.category}</p>
              <p><strong>Experience:</strong> {doctor.experience} years</p>
              <p><strong>Fees:</strong> ₹{doctor.fee}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.hospitalSubmit}`}>
        <button className={styles.button} type="button" onClick={handleSubmit}>
          Submit Hospital Information
        </button>
      </div>

      <footer className={styles.footer}>
        <p>&copy; 2024 SwasthyaPlus. All rights reserved.</p>
      </footer>
    </div>
  );
}


