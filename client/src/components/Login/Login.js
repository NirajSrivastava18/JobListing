import React, { useState } from 'react';
import styles from './Login.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    e.preventDefault();
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const [error, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userDetails.email.length === 0 || userDetails.password.length === 0) {
      setError(true);
    } else {
      try {
        const config = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userDetails),
        };
        const data = await axios.post(
          'http://localhost:5000/login',
          userDetails,
          config
        );
        console.log(data);
        if (data.data.jwttoken) {
          localStorage.setItem('authtoken', data.data.jwttoken);
          localStorage.setItem('RecuriterName', data.data.recruiterName);
          navigate('/jobs');
        } else {
          setError(data.data.message);
        }
      } catch (error) {
        console.log('something went wrong!');
        console.log(error);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h2>Already have an account?</h2>
        <p>Your personal job finder is here</p>
      </div>
      <p className={styles.errormessage}>{error}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={userDetails.email}
          onChange={handleChange}
        />
        {error && userDetails.email.length === 0 ? (
          <label className={styles.errormessage}>Email is Required</label>
        ) : (
          ' '
        )}
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={userDetails.password}
          onChange={handleChange}
        />{' '}
        {error && userDetails.password.length === 0 ? (
          <label className={styles.errormessage}>Password is Required</label>
        ) : (
          ' '
        )}
        <button type="submit">Sign in</button>
      </form>
      <p>
        Don’t have an account?{' '}
        <span>
          <a href="/signup">Sign Up</a>
        </span>
      </p>
    </div>
  );
};

export default Login;
