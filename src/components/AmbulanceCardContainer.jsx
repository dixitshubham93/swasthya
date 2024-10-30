import styles from './AmbulanceCard.module.css'; // Import the CSS module 
import AmbulanceCard from './AmbulanceCard';
import PropTypes from 'prop-types';

const AmbulanceCardContainer = ({ ambulanceSets }) => {

  

  return (
    <div className={styles.ambulanceCardContainer}>
      {ambulanceSets.map((ambulances, index) => (
        <div className={styles.ambulanceSet} key={index}>
          <div className={styles.ambulanceCards}>
              <AmbulanceCard key={ambulances.vehicleno} ambulance={ambulances} />
          </div>
        </div>
      ))}
    </div>
  );
};

AmbulanceCardContainer.propTypes = {
  ambulanceSets: PropTypes.arrayOf(
    PropTypes.shape({
      ambulances: PropTypes.arrayOf(
        PropTypes.shape({
          busy: PropTypes.number.isRequired,
          vehicleno: PropTypes.string.isRequired,
          contact: PropTypes.string.isRequired,
        })
      ).isRequired
    })
  ).isRequired
};

export default AmbulanceCardContainer;
