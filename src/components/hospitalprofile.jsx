import { useState } from 'react';
import styles from './hospitalprofile.module.css';
import MainComponent from './MainComponent'
import AmbulanceCardContainer from './AmbulanceCardContainer';
import { useLocation } from 'react-router-dom';


export function HospitalProfile() {
  // privious photos of the doctors
    //  "https://th.bing.com/th/id/OIP.TKsuwo6wr5wlm2oNa40yRwHaFN?w=298&h=208&c=7&r=0&o=5&dpr=1.3&pid=1.7","https://th.bing.com/th/id/OIP.js_m--7-FZoWCNrtRA-kQwHaFj?w=238&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7","https://th.bing.com/th/id/OIP.qu3TswN9-HPZSlGDoaKc1wHaFa?w=270&h=198&c=7&r=0&o=5&dpr=1.3&pid=1.7"
  const [HOSPITAL, setHOSPITAL] = useState({
    hospitalname: "AIIMS Bhopal",
    hospitalcode: "CGH123",
    About: "AIIMS Bhopal is a multi-specialty hospital providing world-class healthcare services.",
    photourl: ["https://th.bing.com/th/id/OIP.X3RK2pdYODeR9wUXg5dgcwAAAA?w=180&h=110&c=7&r=0&o=5&dpr=1.3&pid=1.7","https://th.bing.com/th/id/OIP.dB3qcHhWIvHhztl6B7YTEwHaCA?w=296&h=95&c=7&r=0&o=5&dpr=1.3&pid=1.7","https://th.bing.com/th/id/OIP.ITT3vFyGC1GJ3_RYl8PWpwHaEc?w=280&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"],
    achievements: ["Best Hospital 2022", "ISO Certified", "24/7 Emergency Services"],
    location: "AIIMS Bhopal is located in the Saket Nagar suburb of Bhopal, Madhya Pradesh, India",
    address: {
    line1: "Shop no.06 BDA Complex Sector 9/A Saket Nagar Aiims Bhopal Madhya Pradesh 462024, Bhopal, Madhya Pradesh",
    line2: "India",
    city: "bhopal",
    state: "Madhya predesh",
    pincode: "987933"
  
    },
    license: "Hospital License #123456",
    doctors: [ {
      name: "Dr. CK Shukla",
      docid: "shubb_if",
      license: "shub_if",
      degrees: "MBBS,BHMS",
      photourl:"data:image/jpeg;base64,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",
      category: "Cardiac Sciences/Heart Transplant",
      experience: 50,
      fee:4000,
        
  },
  {
    name: "Dr. Shubham dixit",
    docid: "dhhiuh",
    license: "l=sdi",
    degrees: "MBBS,BHMS",
    photourl:"https://th.bing.com/th/id/OIP.68QpW-ZRW3kB81JRTaS6zgHaLw?w=198&h=314&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    category: "Cardiac Sciences/Heart Transplant",
    experience: 1,
    fee:200,
},
{
  name: "Dr.Priyanshu pawar",
  docid: "londfda",
  license: "lonsdda",
  degrees: "MBBS,BHMS",
  photourl:"https://th.bing.com/th/id/OIP.QPeK5Vs3y_kmPAiOL8YdpAHaLH?w=202&h=370&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  category: "Cardiac Sciences/Heart Transplant",
  experience: 12,
  fee:1200,
    
},
{
  name: "Dr.Kriti jain",
  docid: "lodsfnda",
  license: "losdnda",
  degrees: "MBBS,BHMS",
  photourl:"https://static3.depositphotos.com/1001992/255/i/950/depositphotos_2552495-stock-photo-successful-doctor-with-stethoscope.jpg",
  category: "Cardiac Sciences/Heart Transplant",
  experience: 38,
  fee:1600,

},
{
  name: "Dr. Shubham dixit",
  docid: "shubb_if",
  license: "shub_if",
  degrees: "MBBS,BHMS",
  photourl:"https://th.bing.com/th?id=OIP.0moSb1V7DWLgTBrytBh6gAHaE8&w=306&h=204&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=3.1&rm=2",
  category: "Cardiac Sciences/Heart Transplant",
  experience: 50,
  fee:4000,
    
},
{
name: "Dr. Saurav sagar",
docid: "dhhiuh",
license: "l=sdi",
degrees: "MBBS,BHMS",
photourl:"https://th.bing.com/th?id=OIP.dfderV6q_ovz-Kkeu0ilVAHaLu&w=198&h=314&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=3.1&rm=2",
category: "Cardiac Sciences/Heart Transplant",
experience: 1,
fee:200,
  
},
{
name: "Dr.Priyanshu pawar",
docid: "londfda",
license: "lonsdda",
degrees: "MBBS,BHMS",
photourl:"https://th.bing.com/th?id=OIP.TLb_Ovto221gvuvm6DM63gHaKg&w=209&h=297&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=3.1&rm=2",
category: "Cardiac Sciences/Heart Transplant",
experience: 12,
fee:1200,

},
{
name: "Dr.kriti jain",
docid: "lodsfnda",
license: "losdnda",
degrees: "MBBS,BHMS",
photourl:"https://static3.depositphotos.com/1001992/255/i/950/depositphotos_2552495-stock-photo-successful-doctor-with-stethoscope.jpg",
category: "Cardiac Sciences/Heart Transplant",
experience: 38,
fee:1600,

},
{
  name: "Dr. Shubham dixit",
  docid: "shubb_if",
  license: "shub_if",
  degrees: "MBBS,BHMS",
  photourl:"https://th.bing.com/th?id=OIP.0moSb1V7DWLgTBrytBh6gAHaE8&w=306&h=204&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=3.1&rm=2",
  category: "Cardiac Sciences/Heart Transplant",
  experience: 50,
  fee:4000,
    
},
{
name: "Dr. Saurav sagar",
docid: "dhhiuh",
license: "l=sdi",
degrees: "MBBS,BHMS",
photourl:"https://th.bing.com/th?id=OIP.dfderV6q_ovz-Kkeu0ilVAHaLu&w=198&h=314&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=3.1&rm=2",
category: "Cardiac Sciences/Heart Transplant",
experience: 1,
fee:200,
  
},
{
name: "Dr.Priyanshu pawar",
docid: "londfda",
license: "lonsdda",
degrees: "MBBS,BHMS",
photourl:"https://th.bing.com/th?id=OIP.TLb_Ovto221gvuvm6DM63gHaKg&w=209&h=297&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=3.1&rm=2",
category: "Cardiac Sciences/Heart Transplant",
experience: 12,
fee:1200,

},
{
name: "Dr.kriti jain",
docid: "lodsfnda",
license: "losdnda",
degrees: "MBBS,BHMS",
photourl:"https://static3.depositphotos.com/1001992/255/i/950/depositphotos_2552495-stock-photo-successful-doctor-with-stethoscope.jpg",
category: "Cardiac Sciences/Heart Transplant",
experience: 38,
fee:1600,

}
],
    beds: [
      {
        bedType: "",
        total: 0,
        occupied: 0,
        charge: 0,
      },
        {
        bedType: "ICU",
        total: 20,
        occupied: 15,
        charge: 5000
        },
        {
        bedType: "General",
        total: 50,
        occupied: 30,
        charge: 2000
        }
    ],
    ambulances: [ {
      busy: 0,
      vehicleno: "MP 04 2207",
      contact: "+91 9389266988"
    },{
      busy: 1,
      vehicleno: "MP 04 2345",
      contact: "+91 9342345567"
    },{
      busy: 0,
      vehicleno: "MP 04 4434",
      contact: "+91 7342345566"
    },
],
  });
console.log(setHOSPITAL);

const location = useLocation();

  
// Access the state object that was passed via navigate
const { data } = location.state || {};

console.log(data);
//com
// setHOSPITAL(data);

  return (
    <div className={styles.hospitalProfile}>
      <div className={styles.header}>
        <h1>{HOSPITAL.hospitalname}</h1>
      </div>

      {/* Photo Carousel */}
      <div className={styles.photoCarousel}>
        {HOSPITAL.photourl.map((photo, index) => (
          <img key={index} src={photo} alt="Hospital" className={styles.hospitalPhoto} />
        ))}
      </div>

      {/* Hospital Information */}
      <div className={styles.hospitalInfo}>
        <h2>Details</h2>
        <p><strong>Hospital Code:</strong> {HOSPITAL.hospitalcode}</p>
        <p><strong>Location:</strong> {HOSPITAL.location}</p>
        <p><strong>Address:</strong> {HOSPITAL.address.line1}, {HOSPITAL.address.line2}, Pincode: {HOSPITAL.address.pincode}</p>
        <p><strong>License:</strong> {HOSPITAL.license}</p>
      </div>

      <div className={styles.aboutSection}>
        <h2>About the Hospital</h2>
        <p>{HOSPITAL.About}</p>
      </div>

      {/* Achievements Section */}
      <div className={styles.achievements}>
        <h2>Achievements</h2>
        <ul>
          {HOSPITAL.achievements.map((achievement, index) => (
            <li key={index}>{achievement}</li>
          ))}
        </ul>
      </div>

      

      {/* Bed Availability */}
      <div className={styles.beds}>
        <h2>Bed Availability
          <img className={styles.liveGfg} src="https://media.tenor.com/33gJyOCSrIYAAAAj/live.gif" alt="Live Bed Status" />
        </h2>
        <table className={styles.bedAvailability}>
      <thead>
        <tr>
          <th>Bed Type</th>
          <th>Total</th>
          <th>Occupied</th>
          <th>Available</th>
          <th>Charge (Per Day)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>ICU</td>
          <td>20</td>
          <td>
            <span className={`${styles.statusBadge} ${styles.occupied}`}>
              15 
            </span>
          </td>
          <td>
            <span className={`${styles.statusBadge} ${styles.available}`}>
              5 
            </span>
          </td>
          <td>
            <span className={styles.price}>₹5000</span>
          </td>
        </tr>
        <tr>
          <td>General</td>
          <td>50</td>
          <td>
            <span className={`${styles.statusBadge} ${styles.occupied}`}>
              30 
            </span>
          </td>
          <td>
            <span className={`${styles.statusBadge} ${styles.available}`}>
              20 
            </span>
          </td>
          <td>
            <span className={styles.price}>₹2000</span>
          </td>
        </tr>
      </tbody>
    </table>
      </div>

      {/* Ambulance Information */}
      <div className={styles.ambulances}>
        {/* <h2 className={styles.ambulanceInfo}>Ambulance Information
        </h2>
        {HOSPITAL.ambulances.map((ambulance,index)=>{
          return(
            <div key={index} >
            <p><strong>Total Ambulances:</strong> {ambulance.count}</p>
        <p><strong>Busy Ambulances:</strong> {ambulance.busy}</p>
        <p><strong>Contact:</strong> {ambulance.contact}</p>
            </div>
          )
        })} */}
        <AmbulanceCardContainer ambulanceSets={HOSPITAL.ambulances}/>
      </div>
      {/* Doctors Section */}
      <MainComponent doctors={HOSPITAL.doctors} hospitalname={HOSPITAL.hospitalname} />
    </div>
  );
};
