import React, { useState } from 'react';
import styles from './RegisterForm.module.css';
import axios from 'axios';

const RegisterForm = () => {
  const [userDetails, setUserDetails] = useState({
    FullName: '',
    email: '',
    mobile: '',
    password: '',
  });
  const [checkbox, setCheckbox] = useState(false);
  const [error, setError] = useState(false);

  const toggleCheckbox = () => {
    setCheckbox((prevState) => !prevState);
  };

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      userDetails.FullName.length === 0 ||
      userDetails.email.length === 0 ||
      userDetails.mobile.length === 0 ||
      userDetails.password.length === 0 ||
      !checkbox
    ) {
      setError(true);
    } else {
      try {
        const config = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const data = await axios.post(
          'http://localhost:5000/signup',
          userDetails,
          config
        );
        console.log(data);
        localStorage.setItem('authtoken', JSON.stringify(data.data.jwttoken));
        localStorage.setItem(
          'RecuriterName',
          JSON.stringify(data.data.recruiterName)
        );
        console.log('User created successfully');
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
        <h2>Create an account</h2>
        <p>Your personal job finder is here</p>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="FullName"
          value={userDetails.FullName}
          onChange={handleChange}
        />{' '}
        {error && userDetails.FullName.length === 0 ? (
          <label className={styles.errormessage}>Name is Required</label>
        ) : (
          ' '
        )}
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
          type="tel"
          maxLength={10}
          name="mobile"
          placeholder="Mobile"
          value={userDetails.mobile}
          onChange={handleChange}
        />
        {error && userDetails.mobile.length === 0 ? (
          <label className={styles.errormessage}>Mobile No is Required</label>
        ) : (
          ' '
        )}
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={userDetails.password}
          onChange={handleChange}
        />
        {error && userDetails.password.length === 0 ? (
          <label className={styles.errormessage}>Password is Required</label>
        ) : (
          ' '
        )}
        <p>
          <input type="checkbox" onClick={toggleCheckbox} />{' '}
          <span>
            By creating an account, I agree to our terms of use and privacy
            policy
          </span>
          {error && !checkbox ? (
            <label className={styles.errormessage}>Please check the box</label>
          ) : (
            ' '
          )}
        </p>
        <button type="submit">Create Account</button>
      </form>
      <p>
        Already have an account?{' '}
        <span>
          <a href="/login">Sign In</a>
        </span>
      </p>
    </div>
  );
};

export default RegisterForm;
