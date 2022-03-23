import React, { useState, useEffect, useContext } from 'react';
import styles from './Navbar.module.scss';
import useResponsive from '../../../hooks/useResponsive';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../context/userContext';

function Navbar() {

  const itemMenu = [
    { to: '/', name: 'Home' },
    { to: '/profil', name: 'Signin'}
  ];

  const itemMenuLog = [
    { to: '/', name: 'Home' },
    { to: '/board', name: 'Board'},
    { to: '/profil', name: 'Profil'}
  ];

  const { currentUser } = useContext(UserContext)
  const { screenType } = useResponsive()
  const [toggleMenu, setToggleMenu] = useState(false);
  const [menu, setMenu] = useState(itemMenu)

  const toggleNavSmallScreen = () => {
    setToggleMenu(!toggleMenu)
  }

  useEffect(() => {
    if (screenType === ("DESKTOP" || "TABLET")) { setToggleMenu(false) }
  }, [screenType]);

  useEffect(() => {
    if(currentUser){
      setMenu(itemMenuLog)
    } else (
      setMenu(itemMenu)
    )
  }, [currentUser])
  return (
    <section className={styles.topnav}>
      <div className={styles.logo}>
        <h3>Onboarding's</h3>
        {currentUser?.photoURL &&
          <img className={styles.img} src={currentUser.photoURL} layout='fixed' width='60px' height='60px' alt="profile" />
        }
        
      </div>
      <input checked={toggleMenu} className={styles.menutoggle} id="menu-toggle" type="checkbox" />
      <label onClick={toggleNavSmallScreen} className={styles.menubuttoncontainer} htmlFor="menu-toggle">
        <div className={styles.menubutton}></div>
      </label>
      {(toggleMenu || screenType === "DESKTOP" || "TABLET") && (
        <ul className={styles.menu}>
          {menu.map((item, index) => (
            <Link key={index} to={item.to}>
              <li className='link-nav' onClick={toggleNavSmallScreen} >{item.name}</li>
            </Link>
          ))}
        </ul>
      )}
    </section>
  )

}

export default Navbar;
