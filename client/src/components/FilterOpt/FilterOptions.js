import React from 'react';
import styles from './FilterOptions.module.css';

const FilterOptions = ({ value, onClick }) => {
  return (
    <div className={styles.filter}>
      <p>{value}</p>
      <span onClick={onClick}>X</span>
    </div>
  );
};

export default FilterOptions;
