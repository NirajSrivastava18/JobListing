import React, { useState } from 'react';
import DropdownArrow from '../../assets/DropdownArrow.svg';
import classes from './DropDown.module.css';

const DropDown = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value || options[0]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setIsOpen(false);
    setSelected(option);
    onChange(option);
  };

  return (
    <div className={classes.Dropdown}>
      <button className={classes.DropdownButton} onClick={toggleDropdown}>
        {selected} <img src={DropdownArrow} alt="" />{' '}
      </button>

      {isOpen && (
        <ul className={classes.DropdownOption}>
          {options.map((option, index) => (
            <li key={index} onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
