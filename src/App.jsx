
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewTabComponent from './components/NewTabComponent';
import HomePage from './pages/HomePage'; // Assuming you have a Home component
import AppointmentCard from './components/AppointmentCard';
import MainComponent from './components/MainComponent';
import Hospitalregis from  "./components/hospitalregis";
import Profile from "./components/doctorsprofile" 
import { Registration } from './components/adminregis';
import { HospitalProfile } from './components/hospitalprofile';
import PatientProfileCard from './components/patientprofile';
import Emergency from './components/Emergency';
import HospitalList from './components/hospitallist';
import Adminlogin from './components/Adminlogin';
import  AdminPanel  from './components/AdminPanel';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/newtabcomponent" element={<NewTabComponent />} />
        <Route path='/Appointmentdetails' element={<AppointmentCard />} />
        <Route path='/MainComponent' element={<MainComponent />} />
        <Route path="/hospitalregis" element={<Hospitalregis />} />
        <Route path="/doctorsprofile" element={<Profile/>} />
        <Route path="/registration" element={<Registration/>} />
        <Route path="/hospitalprofile" element={<HospitalProfile/>} />
        <Route path="/patientprofile" element={<PatientProfileCard/>} />
        <Route path="/Emergency" element={<Emergency/>} />
        <Route path="/hospitallist" element={<HospitalList/>} />
        <Route path="/adminlogin" element={<Adminlogin />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
};

export default App;

// import Profile from './components/doctorsprofile';


// const doctor = {
//     image: 'doctor-image.jpg',
//     name: 'Dr. Ajay Kaul',
//     title: 'Chairman Cardiac Science | Fortis Noida',
//     specialty: 'Cardiac Sciences | Adult CTVS...',
//     experience: 38,
//     fees: 1600,
//     about: 'Dr. Ajay Kaul is listed among the top cardiac surgeons...',
//     education: 'MBBS, MS (General Surgery), M.Ch...',
//     awards: 'Dr. Ajay Kaul is listed among...',
//     publications: 'One of the highest number of TAVR...',
// };

// function App() {
//     return (
//         <div>
//             <Profile doctor={doctor} />
//             <Hospitalregis/>
//         </div>
//     );
// }

// export default App;
