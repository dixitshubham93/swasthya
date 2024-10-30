import styles from './HospitalList.module.css';

const hospitals = [
    "City Hospital - New Delhi",
    "Global Health Clinic - Bangalore",
    "Sunshine Hospital - Kolkata",
    "Downtown Medical Center - Lucknow",
    "Green Valley Hospital - Indore"
];

const HospitalList = () => {
    return (
        <div className={styles.hospitalListContainer}>
            <h2 className={styles.hospitalListHeading}>List of Hospitals</h2>
            <ul className={styles.hospitalList}>
                {hospitals.map((hospital, index) => (
                    <li key={index} className={styles.hospitalListItem}>
                        {hospital}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HospitalList;
