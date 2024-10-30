
import { useNavigate } from 'react-router-dom';
import styles from './DoctorCard.module.css';
import PropTypes from 'prop-types';

const DoctorCard = ({ doctor ,hospitalname}) => {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate('/Appointmentdetails', { state: { doctor_hospital:`${doctor.name}|${hospitalname}`, date:12/11/24, selectedSlot:"8:00pm-9:00pm"} });
  };
  console.log(hospitalname);
  return (
    <div className={styles.card}>
      <div className={styles.cardfix}>
        <img
          src={doctor.photourl}
          alt={doctor.name}
          className={styles.image}
        />
        <div className={styles.textfix}>
          <h2>{doctor.name}</h2>
          <div className={styles.position}>
            {doctor.category} | {hospitalname}
          </div>
          <div className={styles.specialization}>
           <span>{doctor.category}</span>
          </div>
          <div className={styles.info}>
            <div>🕒 {doctor.experience} Years</div>
            <div>₹ {doctor.fee}</div>
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.viewProfileBtn} onClick={()=>{navigate("/doctorsprofile")}}>View Full Profile</button>
        <button className={styles.bookAppointmentBtn} onClick={handleBookAppointment}>
        Book An Appointment
        </button>
      </div>
    </div>
  );
};

DoctorCard.propTypes = {
  doctor:  PropTypes.shape({
    name: PropTypes.string,
    docid: PropTypes.string,
    license: PropTypes.string,
    degrees: PropTypes.string,
    photourl:PropTypes.string,
    category: PropTypes.string,
    experience: PropTypes.number,
    fee:PropTypes.number.isRequired,} ),
    hospitalname:PropTypes.string,
};

export default DoctorCard;
