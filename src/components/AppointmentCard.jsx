
import { useState ,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import styles from './AppointmentCard.module.css';
import { useNavigate } from 'react-router-dom';


const AppointmentCard = () => {
  const navigate=useNavigate();
  const location = useLocation();
  const { doctor_hospital, date, selectedSlot ,docid} = location.state || {};

  // const [formData,setFormData]=useState(
  //   {
  //     name:"",
  //     email:"",
  //     age:0,
  //     docid: "",
  //     mobile:"",
  //     password:"",
  //     blood:"",
  //     gender:"",
  //     address:"",
  //     date:"",
  //     timeslot:"",
  //     doctor_hospital:""
  
  //   }
  // )

  // Initial state for the form data (without doctor_hospital, date, and selectedSlot)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    age: 0,
    gender: '',
    date_of_birth:'',
    doctor_hospital:'',
    blood: '',
    address: '',
    date: '',
    docid:'',
    password:'',
    timeslot: '',

  });

  // Update formData once location.state is available
  useEffect(() => {
    if (doctor_hospital && date && selectedSlot&&docid) {
      setFormData((prevData) => ({
        ...prevData,
        doctor_hospital: doctor_hospital,
        date: date,
        timeslot: selectedSlot,
        docid:docid
      }));
    }
  }, [doctor_hospital, date, selectedSlot,docid]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOn = async (e) => {
    e.preventDefault();
    alert('Appointment Successfull!')
    navigate('/')
    console.log(formData)
   
      // Handle error logic here (e.g., show an error message)
    
  };

  // Handle form submission
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Perform actions with formData, such as sending it to a server
  //   console.log('Form submitted:', formData);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

  };

  return (
    <div className={styles.adjuster}>
      <div className={styles.container}>
        {/* Main Content */}
        <section className={styles.mainContent}>
          <header className={styles.contentHeader}></header>
          {/* Form for Adding Patient Information */}
          <h1>Add Patient Information</h1>
          <div><br /></div>
          <form onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email ID *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="mobile">Mobile Number *</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="age">Age *</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="gender">Gender *</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Other</option>
                </select>
              </div>
              {/* <div className={styles.formGroup}>
                <label htmlFor="marital">Marital Status *</label>
                <select
                  id="marital"
                  name="marital"
                  value={formData.marital}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                </select>
              </div> */}
              <div className={styles.formGroup}>
                <label htmlFor="blood">Blood Group *</label>
                <input
                  type="text"
                  id="blood"
                  name="blood"
                  value={formData.bloodD}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="date_of_birth">Date of Birth *</label>
                <input
                  type="date"
                  id="date_of_birth"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="address">Address *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.doctor}>
              <label htmlFor="password">password</label>
              <input
                type="text"
                id="doctor"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.doctor}>
              <label htmlFor="doctor_hospital">Doctor/Hospital</label>
              <input
                type="text"
                id="doctor"
                name="doctor_hospital"
                value={formData.doctor_hospital}
                readOnly
              />
            </div>
            <button type="submit" className={styles.btnSubmit} onClick={handleOn}>Submit</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default AppointmentCard;