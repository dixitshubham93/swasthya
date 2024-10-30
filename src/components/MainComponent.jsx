// import React from 'react';
import DoctorList from './DoctorList';
import Styles from './mainComponent.module.css';
import PropTypes from 'prop-types';

const MainComponent = (props) => {

  console.log(`ye ${props.hospitalname}`);
  return (
    <div>
      <h1 className={Styles.doctorlistheading}>Doctors Listings</h1>
      <DoctorList doctors={props.doctors} hospitalname={props.hospitalname} />
    </div>
  );
};
MainComponent.propTypes = {
  doctors:PropTypes.arrayOf(
    PropTypes.shape({
    name: PropTypes.string.isRequired,
    docid: PropTypes.string.isRequired,
    license: PropTypes.string.isRequired,
    degrees: PropTypes.string.isRequired,
    photourl:PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    experience: PropTypes.number.isRequired,
    fee:PropTypes.number.isRequired,} )
)  ,
  hospitalname:PropTypes.string.isRequired,
};
export default MainComponent;
