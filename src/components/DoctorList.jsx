import { useState } from 'react';
import DoctorCard from './DoctorCard';
import styles from './DoctorList.module.css';
import PropTypes from 'prop-types';

const DoctorList = ({ doctors ,hospitalname}) => {
  const [sortType, setSortType] = useState('');

  const handleSortChange = (event) => {
    setSortType(event.target.value);
  };

  const sortedDoctors = [...doctors].sort((a, b) => {
    if (sortType === 'experience') {
      return b.experience - a.experience;
    } else if (sortType === 'fee') {
      return a.fee - b.fee;
    } else {
      return 0;
    }
  });
  console.log("doclist")
  console.log(hospitalname );
  return (
    <div className={styles.container}>

      <div className={styles.sortContainer}>
        <label>Sort by: </label>
        <select onChange={handleSortChange} value={sortType}>
          <option value="">None</option>
          <option value="experience">Experience</option>
          <option value="fee">Fee</option>
        </select>
      </div>
      <div className={styles.grid}>
        {sortedDoctors.map((doctor, index) => (
          <DoctorCard key={index} doctor={doctor} hospitalname={hospitalname} />
        ))}
      </div>
    </div>
  );
};

// Adding PropTypes validation for the doctors prop
DoctorList.propTypes = {
  doctors: PropTypes.arrayOf(
    PropTypes.shape({
    name: PropTypes.string.isRequired,
    docid: PropTypes.string.isRequired,
    license: PropTypes.string.isRequired,
    degrees: PropTypes.string.isRequired,
    photourl:PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    experience: PropTypes.number.isRequired,
    fee:PropTypes.number.isRequired,
    })
  ).isRequired,
  hospitalname:PropTypes.string.isRequired,
};

export default DoctorList;
