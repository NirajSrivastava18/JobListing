import React, { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import rect1 from '../../assets/Rectangle1.png';
import rect2 from '../../assets/Rectangle2.png';
import rect3 from '../../assets/Rectangle3.png';
import { useNavigate } from 'react-router-dom';
import profilepic from '../../assets/profile.png';

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('authtoken');
  const [authorization, setAuthorization] = useState(false);

  useEffect(() => {
    if (token) {
      setAuthorization(true);
    } else {
      setAuthorization(false);
    }
  }, [token]);

  const logout = (e) => {
    localStorage.removeItem('authtoken');
    localStorage.removeItem('RecuriterName');
    navigate('/jobs');
  };

  const greetings = `Hello!  ${localStorage.getItem('RecuriterName')}`;

  return (
    <>
      <div className={styles.navbar}>
        <img src={rect1} className={styles.rect1} alt="rect1" />
        <img src={rect2} className={styles.rect2} alt="rect2" />
        <img src={rect3} className={styles.rect3} alt="rect3" />
        <div className={styles.NavItem}>
          <h3 style={{ zIndex: 3, fontSize: '25px' }}>JobFinder</h3>
          <div className={styles.RightnavItem}>
            {authorization ? (
              <>
                <span style={{ cursor: 'pointer' }} onClick={logout}>
                  Logout
                </span>
                <p style={{ fontSize: '16px' }}>{greetings}</p>
                <img src={profilepic} alt="profile" />
              </>
            ) : (
              <>
                <button
                  className={styles.loginbutton}
                  onClick={() => navigate('/login')}
                >
                  LogIn
                </button>
                <button
                  className={styles.registerbutton}
                  onClick={() => navigate('/signup')}
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
