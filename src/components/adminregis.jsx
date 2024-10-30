// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styles from './adminregis.module.css';
// import { mylink } from './link';

// export function Registration() {

//     const navigate = useNavigate();
//     const [admin, setAdmin] = useState({
//         hospitalname: '',
//         hospitalcode: '',
//         admins: [{ username: '', password: '' }],
//     });

//     const handleSubmit = async (e) => {
//         e.preventDefault(); // Prevent default form submission behavior
//         console.log(admin);

//         try {
//             const response = await fetch(`${mylink}/hospitalregister`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(admin),
//             });
//             console.log("hello")
//             console.log(admin);

//             if (!response.ok) {
//                 throw new Error('Failed to register hospital');
//             }

//             const data = await response.json();
//             console.log('Success:', data);
//             navigate('/hospitalregis'); // Navigate to another page on success
//         } catch (error) {
            
//             console.error('Error:', error);
//         }
//     };

//     const handleAddAccountant = () => {
//         if (admin.admins.length < 4) {
//             setAdmin((prevAdmin) => ({
//                 ...prevAdmin,
//                 admins: [...prevAdmin.admins, { username: '', password: '' }]
//             }));
//         }
//     };

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setAdmin((prevAdmin) => ({
//             ...prevAdmin,
//             [name]: value,
//         }));
//     };

//     const handleAdminInputChange = (index, event) => {
//         const { name, value } = event.target;
//         const updatedAdmins = admin.admins.map((accountant, i) =>
//             i === index ? { ...accountant, [name]: value } : accountant
//         );
//         setAdmin((prevAdmin) => ({
//             ...prevAdmin,
//             admins: updatedAdmins,
//         }));
//     };

//     return (
//         <div className={styles.containerr}>
//             <h2>Hospital Registration</h2>
//             <form onSubmit={handleSubmit}>
//                 {/* Hospital Name */}
//                 <label htmlFor="hospitalname">Hospital Name:</label>
//                 <input
//                     type="text"
//                     id="hospitalname"
//                     name="hospitalname"
//                     placeholder="Enter Hospital Name"
//                     value={admin.hospitalname}
//                     onChange={handleInputChange}
//                     required
//                 />

//                 {/* Hospital ID Number */}
//                 <label htmlFor="hospitalcode">Hospital Identification Number:</label>
//                 <input
//                     type="text"
//                     id="hospitalcode"
//                     name="hospitalcode"
//                     placeholder="Enter Hospital ID Number"
//                     value={admin.hospitalcode}
//                     onChange={handleInputChange}
//                     required
//                 />

//                 {/* Accountant Section */}
//                 <div className={styles.accountantSection}>
//                     <h3>Accountants (Up to 4)</h3>
//                     {admin.admins.map((accountant, index) => (
//                         <div key={index} className={styles.accountantContainer}>
//                             <label htmlFor={`username${index}`}>Accountant {index + 1} Name:</label>
//                             <input
//                                 type="text"
//                                 id={`username${index}`}
//                                 name="username"
//                                 placeholder="Enter Accountant Name"
//                                 value={accountant.username}
//                                 onChange={(e) => handleAdminInputChange(index, e)}
//                                 required
//                             />
//                             <label htmlFor={`password${index}`}>Accountant {index + 1} Password:</label>
//                             <input
//                                 type="password"
//                                 id={`password${index}`}
//                                 name="password"
//                                 placeholder="Enter Password"
//                                 value={accountant.password}
//                                 onChange={(e) => handleAdminInputChange(index, e)}
//                                 required
//                             />
//                         </div>
//                     ))}
//                     {admin.admins.length < 4 && (
//                         <button type="button" className={styles.addAccountantBtn} onClick={handleAddAccountant}>
//                             Add Another Accountant
//                         </button>
//                     )}
//                 </div>

//                 {/* Register Button */}
//                 <div>
//                     <button type="submit">Submit</button>
//                 </div>
//             </form>

//             <p>Already have an account? <a href="/login">Login here</a></p>
//         </div>
//     );
// }
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './adminregis.module.css';

export function Registration() {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState({
        hospitalname: '',
        hospitalcode: '',
        admins: [{ username: '', password: '' }],
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(admin);
        navigate('/hospitalregis');
    };

    const handleAddAccountant = () => {
        if (admin.admins.length < 4) {
            setAdmin(prevAdmin => ({
                ...prevAdmin,
                admins: [...prevAdmin.admins, { username: '', password: '' }]
            }));
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAdmin(prevAdmin => ({
            ...prevAdmin,
            [name]: value,
        }));
    };

    const handleAdminInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedAdmins = admin.admins.map((accountant, i) =>
            i === index ? { ...accountant, [name]: value } : accountant
        );
        setAdmin(prevAdmin => ({
            ...prevAdmin,
            admins: updatedAdmins,
        }));
    };

    return (
        <div className={styles.containerr}>
            <h2>Hospital Registration</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="hospitalname">Hospital Name:</label>
                <input
                    type="text"
                    id="hospitalname"
                    name="hospitalname"
                    placeholder="Enter Hospital Name"
                    value={admin.hospitalname}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="hospitalcode">Hospital Identification Number:</label>
                <input
                    type="text"
                    id="hospitalcode"
                    name="hospitalcode"
                    placeholder="Enter Hospital ID Number"
                    value={admin.hospitalcode}
                    onChange={handleInputChange}
                    required
                />

                <div className={styles.accountantSection}>
                    <h3>Accountants (Up to 4)</h3>
                    {admin.admins.map((accountant, index) => (
                        <div key={index} className={styles.accountantContainer}>
                            <label htmlFor={`username${index}`}>Accountant {index + 1} Name:</label>
                            <input
                                type="text"
                                id={`username${index}`}
                                name="username"
                                placeholder="Enter Accountant Name"
                                value={accountant.username}
                                onChange={(e) => handleAdminInputChange(index, e)}
                                required
                            />
                            <label htmlFor={`password${index}`}>Accountant {index + 1} Password:</label>
                            <input
                                type="password"
                                id={`password${index}`}
                                name="password"
                                placeholder="Enter Password"
                                value={accountant.password}
                                onChange={(e) => handleAdminInputChange(index, e)}
                                required
                            />
                        </div>
                    ))}
                    {admin.admins.length < 4 && (
                        <button type="button" className={styles.addAccountantBtn} onClick={handleAddAccountant}>
                            Add Another Accountant
                        </button>
                    )}
                </div>

                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>

            <p>Already have an account? <a href="/login">Login here</a></p>
        </div>
    );
}
