import React from 'react';
import Banner from '../components/Banner/Banner';
import Login from '../components/Login/Login';

const login = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Login />
      <Banner />
    </div>
  );
};

export default login;
