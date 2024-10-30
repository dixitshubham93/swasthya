import  { useEffect, useState } from 'react';
import styles from './Emergency.module.css';

const hospitals = [
    {
        name: `People's Hospital`,
        lat: 23.2352,
        lon: 77.4293,
        phone: '+91 98765 43210',

        mapLink: 'https://maps.google.com?q=23.2352,77.4293',
        img: 'https://th.bing.com/th/id/OIP.Bc-uewnxzvgOr9dBWfz2uwHaE-?rs=1&pid=ImgDetMain'
    },
    {
       name: 'AIIMS Bhopal',
        lat: 23.2500,
        lon: 77.4457,
        phone: '+91 9389266988',
        mapLink: 'https://maps.google.com?q=23.2500,77.4457',
        img: 'https://th.bing.com/th/id/OIP.2X3hCOTleEyVVqmOx6oTOQHaFj?w=750&h=562&rs=1&pid=ImgDetMain'
    },
    {
        name: 'Bansal Hospital',
        lat: 23.1500,
        lon: 77.4457,
        phone: '+91 8271909931',
        mapLink: 'https://maps.google.com?q=23.1500,77.4457',
        img: 'https://threebestrated.in/images/BansalHospital-Bhopal-MP.png'
    }
];

const Emergency = () => {
    const [hospitalsWithDistance, setHospitalsWithDistance] = useState([]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showHospitals, handleError);
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    }, []);

    const showHospitals = (position) => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;

        const updatedHospitals = hospitals.map(hospital => {
            const distance = calculateDistance(userLat, userLon, hospital.lat, hospital.lon);
            return { ...hospital, distance };
        });

        // Sort hospitals by distance (ascending)
        updatedHospitals.sort((a, b) => a.distance - b.distance);
        setHospitalsWithDistance(updatedHospitals);
    };

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a =
            0.5 - Math.cos(dLat) / 2 +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            (1 - Math.cos(dLon)) / 2;
        return R * 2 * Math.asin(Math.sqrt(a));
    };

    const handleError = (error) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert('Location access is denied by the user.');
                break;
            case error.POSITION_UNAVAILABLE:
                alert('Location information is unavailable.');
                break;
            case error.TIMEOUT:
                alert('The request to get user location timed out.');
                break;
            default:
                alert('An unknown error occurred.');
        }
    };

    return (
        <section className={styles.hospitalList}>
            <div className={styles.hospitalsContainer}>
                {hospitalsWithDistance.map(hospital => (
                    <div className={styles.hospitalCard} key={hospital.name}>
                        <img src={hospital.img} alt={hospital.name} className={styles.hospitalImg} />
                        <h3 className={styles.hospitalName}>{hospital.name}</h3>
                        <p className={styles.hospitalInfo}>Phone: {hospital.phone}</p>
                        <p className={styles.hospitalDistance}>Distance: {hospital.distance.toFixed(2)} km</p>
                        <div className={styles.cardActions}>
                            <button onClick={() => window.open(`tel:${hospital.phone}`)}>
                                <i className="fa fa-phone" /> Call
                            </button>
                            <button onClick={() => window.open(hospital.mapLink)}>
                                <i className="fas fa-map-marker-alt" /> Map
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Emergency;
