// // import React from 'react';
// import Navbar from '../components/Navbar';
// import SearchBar from '../components/SearchBar';
// // import AppointmentCard from '../components/AppointmentCard';
// // import EmergencyContact from '../components/EmergencyContact';
// // import HospitalSearch from '../components/HospitalSearch';
// import BotpressChat from '../components/chatbot';

// const HomePage = () => {
  
//   return (
//     <div >
//       <Navbar />
//         <SearchBar />
//         <BotpressChat />

//     </div>
//   );
// };

// export default HomePage;
import { useEffect, useState } from 'react';
import styles from './HomePage.module.css';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import BotpressChat from '../components/chatbot';

const HomePage = () => {
const  navigate=useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      img: "https://cdn.pixabay.com/photo/2024/05/19/09/37/ai-generated-8772169_640.png",
      text: "“The truth? When we used to go to the clinic in Mulabana, we could spend the whole day...”",
      author: "Aditi Dixit",
      role: "Housewife, Delhi",
    },
    {
      img: "https://img.freepik.com/premium-photo/asian-female-patient-with-happiness-lying-bed-hospital_33413-1834.jpg",
      text: "“SwasthyaPlus has been a blessing for my family. We no longer have to travel far...”",
      author: "Sapna Chaudhary",
      role: "Dancer, Haryana",
    },
    {
      img: "https://static.vecteezy.com/system/resources/previews/007/108/479/non_2x/portrait-of-young-female-patient-lying-on-clinic-bed-wearing-hospital-gown-photo.jpg",
      text: "“The outreach clinics have really improved access to healthcare for all...”",
      author: "Eesha Sharma",
      role: "Student, Bhopal",
    },
    {
      img: "https://previews.123rf.com/images/stockbroker/stockbroker1303/stockbroker130302285/18736016-teenage-female-patient-relaxing-in-hospital-bed.jpg",
      text: "“I was able to book an appointment and consult a doctor online in minutes...”",
      author: "Ananisha Singh",
      role: "Teacher, Bangalore",
    },
    {
      img: "https://static.vecteezy.com/system/resources/previews/007/108/479/non_2x/portrait-of-young-female-patient-lying-on-clinic-bed-wearing-hospital-gown-photo.jpg",
      text: "“Great service and compassionate care. Thank you SwasthyaPlus for bringing the best healthcare...”",
      author: "Arya Gupta",
      role: "Housewife, Mumbai",
    }
  ];

  return (
    <div className={styles.container}>
      {/* Navigation Bar */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>Swasthya <span>+</span></div>
        <div className={styles.navButtons}>
          <button className={styles.loginButton}onClick={()=>{navigate('/adminlogin')}}>Admin-Login</button>
          <button className={styles.loginButton} onClick={()=>{navigate('./registration')}}>Registration</button>
          <button className={styles.loginButton} onClick={()=>{navigate('./newtabcomponent')}}>My Appointments</button>
          <button className={styles.emergencyButton} onClick={()=>{navigate('./Emergency')}}>Emergency</button>
        </div>
      </nav>

      
      {/* <div className={styles.mainContent}>
        <h1>Welcome to SwasthyaPlus</h1>
        <p>Your health, our priority. Find doctors, hospitals, and services near you.</p>
        <HospitalSearch/>
      </div> */}
      <SearchBar/>

      {/* Testimonials Section */}
      <div className={styles.testimonials}>
        <h2 className={styles.h2}>Our Testimonials</h2>
        <div className={styles.testimonialContainer}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={`${styles.testimonialCard} ${index === currentIndex ? styles.active : ''}`}>
              <img src={testimonial.img} alt={`Testimonial ${index + 1}`} className={styles.testimonialImage} />
              <blockquote className={styles.text}>{testimonial.text}</blockquote>
              <p className={styles.author}>{testimonial.author}</p>
              <p className={styles.role}>{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>

      <BotpressChat/>     

      {/* Footer */}
      <footer className={styles.footer}>
        © 2024 SwasthyaPlus. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;