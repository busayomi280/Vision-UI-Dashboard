import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import Signinterface from "./signinterface";
import { Link } from "react-router-dom";
import "./signin.css";

function Login() {
  const [formData, setFormData] = useState({
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
      await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      // Handle specific Firebase errors
      switch (err.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setError('Invalid email or password');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed attempts. Please try again later.');
          break;
        default:
          setError('Failed to sign in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Signinterface />
      <div className="formside-2 login-formm">
        <h1 className='nice'>Nice to see you!</h1>
        <p className="formside-p">Enter your email and password to sign in.</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-container">
          <form onSubmit={handleSubmit}>
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
              placeholder="Your password" 
              value={formData.password}
              onChange={handleChange}
              required 
            /><br />
            
            <button 
              type="submit" 
              className="register-btn"
              disabled={loading}
            >
              {loading ? 'SIGNING IN...' : 'SIGN IN'}
            </button>
          </form>
          
          <p className="signin-link">
            Don't have an account?
            <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;