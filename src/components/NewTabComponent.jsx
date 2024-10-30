import './NewTabComponent.css';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mylink } from './link';


const NewTabComponent = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [isSignUp, setIsSignUp] = useState(false);

  const [demo, usedemo] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    usedemo((prevDemo) => ({
      ...prevDemo,
      [name]: value,
    }));
  };

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    console.log(demo); // Check the updated state

    if (!demo.username || !demo.password) {
      alert('Please fill in both username and password');
      return;
    }
    navigate('/patientprofile');
    try {
      const response = await fetch(`${mylink}/patientlogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(demo),
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }
      
      const data = await response.json();
      console.log('Success:', data);
      navigate('/patientprofile'); // Navigate to the profile page
    } catch (error) {
      console.error('Error: Incorrect Credentials', error);
    }
  };

  React.useEffect(() => {
    if (containerRef.current) {
      if (isSignUp) {
        containerRef.current.classList.add('right-panel-active');
      } else {
        containerRef.current.classList.remove('right-panel-active');
      }
    }
  }, [isSignUp]);

  return (
    <div className='forfix'>
      <div className={`new-tab-component ${isSignUp ? 'right-panel-active' : ''}`} ref={containerRef}>
        <div className="form-container sign-up-container">
          <form action="#">
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button id="signUp" className="bluebtn" onClick={handleSignUpClick}>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleSignInClick}>
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your account</span>
            <input
              name="username"
              type="text"
              placeholder="Username"
              onChange={handleChange}
              value={demo.username}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={demo.password}
              required
            />
            <a href="#">Forgot your password?</a>
            <button type="submit" className="bluebtn">Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" id="signIn" onClick={() => setIsSignUp(false)}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" id="signUp" onClick={handleSignUpClick}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTabComponent;
