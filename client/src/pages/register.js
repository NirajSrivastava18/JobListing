import React from 'react';
import Banner from '../components/Banner/Banner';
import RegisterForm from '../components/RegisterForm/RegisterForm';

const register = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <RegisterForm />
      <Banner />
    </div>
  );
};

export default register;
