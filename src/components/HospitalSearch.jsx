
import { useState} from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import styles from './HospitalSearch.module.css';



const HospitalSearch = () => {
    
    const [inputValue, setInputValue] = useState('');
    const [noResults, setNoResults] = useState(false);
    const [isValidInput, setIsValidInput] = useState(false);

    const navigate = useNavigate(); // Use the navigate hook
    
    
    const [suggestions, setSuggestions] = useState([]); // State to store suggestions

    // // Fetch suggestions when the page is rendered
    // useEffect(() => {
    //     const fetchSuggestions = async () => {
    //         try {
    //             const response = await fetch(`${mylink}/searchsuggestion`, {
    //                 method: 'GET',
    //             });

    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch ssdfsdfuggestions');
    //             }

    //             const data = await response.json();
    //             setSuggestions(data); // Update state with fetched data
    //         } catch (error) {
    //             console.error('Errorsdf fetchingsdfd sdfsuggestions:', error);
    //         }
    //     };

    //     fetchSuggestions(); // Call the function to make the GET request
    // }, []); // Empty dependency array ensures this runs only once when the component mounts

    const hospitals = [
        "AIIMS - BHOPAL",
        "Global Health Clinic - Bangalore",
        "Sunshine Hospital - Kolkata",
        "Downtown Medical Center - Lucknow",
        "Green Valley Hospital - Indore"
    ];

    const doctors = [
        "Dr. Ajay Singh  - Cardiologist - New Delhi",
        "Dr. Krishna Sharma - Dermatologist - Bangalore",
        "Dr. Gaurav Tiwari - Neurologist - kolkata",
        "Dr. OP Rajendra - Pediatrician - Lucknow",
        "Dr. CK Shukla - Orthopedic - Bhopal"
    ];

    const cities = [
        "New Delhi",
        "Bangalore",
        "Kolkata",
        "Lucknow",
        "Indore",
        "Bhopal"
    ];
    
    const showSuggestions = (value) => {
        setInputValue(value);
        if (value.length === 0) {
            setSuggestions([]);
            setNoResults(false);
            setIsValidInput(false);  // If the input is empty, mark as invalid
            return;
        }

        const filteredHospitals = hospitals.filter(item => 
            item.toLowerCase().includes(value.toLowerCase())
        );
        const filteredDoctors = doctors.filter(item => 
            item.toLowerCase().includes(value.toLowerCase())
        );
        const filteredCities = cities.filter(item => 
            item.toLowerCase().includes(value.toLowerCase())
        );

        const suggestionsArray = [];

        if (filteredHospitals.length > 0) {
            suggestionsArray.push({ title: 'Hospitals', items: filteredHospitals });
        }

        if (filteredDoctors.length > 0) {
            suggestionsArray.push({ title: 'Doctors', items: filteredDoctors });
        }

        if (filteredCities.length > 0) {
            suggestionsArray.push({ title: 'Cities', items: filteredCities });
        }

        setSuggestions(suggestionsArray);
        setNoResults(suggestionsArray.length === 0);

        // Validate if the input exactly matches a suggestion
        const allOptions = [...filteredHospitals, ...filteredDoctors, ...filteredCities];
        const isValid = allOptions.includes(value);
        setIsValidInput(isValid);
    };

    const handleSearchClick = async() => {
        if (!inputValue) {
            alert("Please enter a search term.");
            return;
        }

        if (isValidInput) {

            console.log("Searching for:", inputValue);
            // Define navigation logic based on type of search result
            if (hospitals.includes(inputValue)) {
                
                 
                navigate('/hospitalprofile');  // Navigate to hospital profile
            } else if (doctors.includes(inputValue)) {
                
                navigate('/doctorsprofile'); 
            } else if (cities.includes(inputValue)) {

                navigate('/hospitallist');  // Navigate to hospital profile
            }

        } else {
            alert("Please select a valid option from the suggestions.");
        }
    };

    return (
        <div className={styles.foradjust}>
            <div className={styles.searchContainer}>
                <div className={styles.searchholder}>
                    <input 
                        type="text" 
                        value={inputValue}
                        onChange={(e) => showSuggestions(e.target.value)} 
                        placeholder="Search hospital/doctor/city..." 
                        className={styles.searchBox}
                    />
                    <button 
                        className={styles.searchbtn}
                        onClick={handleSearchClick}
                    >
                        <img  className={styles.imgsearch}src="https://img.icons8.com/?size=100&id=82712&format=png&color=000000" alt="Search" />
                    </button>
                </div>
                
                <div 
                    className={`${styles.suggestions} ${inputValue.length > 0 ? styles.show : ''}`}
                >
                    {noResults ? (
                        <div className={styles.noResults}>No results found</div>
                    ) : (
                        suggestions.map((group, index) => (
                            <div key={index} className={styles.suggestionGroup}>
                                <h3>{group.title}</h3>
                                {group.items.map((item, idx) => (
                                    <div 
                                        key={idx} 
                                        className={styles.suggestionItem} 
                                        onClick={() => {
                                            setInputValue(item);
                                            setSuggestions([]);
                                            setNoResults(false);
                                            setIsValidInput(true);
                                        }}
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default HospitalSearch;
