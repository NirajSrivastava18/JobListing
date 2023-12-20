import React from 'react';
import Banner from '../components/BannerDesc/BannerDesc';
import CreateJob from '../components/AddJobdesc/Addjobdesc';

const description = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <CreateJob />
      <Banner />
    </div>
  );
};

export default description;
