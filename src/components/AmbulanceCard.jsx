import styles from './AmbulanceCard.module.css'; 
import PropTypes from 'prop-types'; // Correct the typo here

const AmbulanceCard = ({ ambulance }) => {
  const { busy, vehicleno, contact } = ambulance;

  return (
    <div className={styles.ambulanceCard}>
      <div className={`${styles.statusBadge} ${busy === 1 ? styles.occupied : styles.available}`}>
        {busy === 1 ? 'Busy' : 'Available'}
      </div>

      <div className={styles.ambulanceDetails}>
        <p><strong>Vehicle No:</strong> {vehicleno || 'N/A'}</p>
        <p><strong>Contact:</strong> {contact || 'N/A'}</p>
      </div>
    </div>
  );
};

AmbulanceCard.propTypes = {
  ambulance: PropTypes.shape({
    busy: PropTypes.number.isRequired,
    vehicleno: PropTypes.string.isRequired,
    contact: PropTypes.string.isRequired,
  }).isRequired // Added isRequired for the ambulance prop itself
};

export default AmbulanceCard;
