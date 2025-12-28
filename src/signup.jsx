import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from './firebase';
import Signinterface from "./signinterface";
import { Link } from "react-router-dom";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import './signin.css';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Update user profile with name
      await updateProfile(userCredential.user, {
        displayName: formData.name,
      });

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      // Handle specific Firebase errors
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('This email is already registered');
          break;
        case 'auth/weak-password':
          setError('Password should be at least 6 characters');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address');
          break;
        default:
          setError('Failed to create account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return(
    <div>
      <Signinterface/>
      <div className="formside-2">
        <h1>Welcome!</h1>
        <p className="formside-p">Use this awesome form to create a new account for free.</p>
        <div className="form-container">
          <h3>Register with</h3>
          <div className="social-icons">
            <div><FaFacebook/></div>
            <div><FaGoogle/></div>
            <div><FaApple/></div>
          </div>
          <p>or</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <label>Name</label> <br />
            <input 
              type="text" 
              name="name"
              placeholder="Your full name" 
              value={formData.name}
              onChange={handleChange}
              required 
            /> <br />
            
            <label>Email</label> <br />
            <input 
              type="email" 
              name="email"
              placeholder="Your email address" 
              value={formData.email}
              onChange={handleChange}
              required 
            /> <br />
            
            <label>Password</label><br />
            <input 
              type="password" 
              name="password"
              placeholder="Your password (min 6 characters)" 
              value={formData.password}
              onChange={handleChange}
              minLength="6"
              required 
            /><br />
            
            <button 
              type="submit" 
              className="register-btn"
              disabled={loading}
            >
              {loading ? 'SIGNING UP...' : 'SIGN UP'}
            </button>
          </form>
          
          <p className="signin-link">
            Already have an account?
            <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;