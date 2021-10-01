import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import Playlists from './Playlists';
import { FaDoorOpen } from 'react-icons/fa';

const styles = {
   bmBurgerButton: {
      position: 'fixed',
      width: '26px',
      height: '20px',
      left: '15px',
   },
   bmBurgerBars: {
      background: '#01a5af',
   },
   bmBurgerBarsHover: {
      background: '#a90000',
   },
   bmCrossButton: {
      height: '24px',
      width: '24px',
   },
   bmCross: {
      background: '#fff',
   },
   bmMenuWrap: {
      position: 'fixed',
      height: '100%',
   },
   bmMenu: {
      background: 'rgba(0, 0, 0, 0.9)',
      padding: '0 1.5em 0 0',
      fontSize: '1.15em',
   },
   bmMorphShape: {
      fill: '#373a47',
   },
   bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em',
      display: 'flex',
      'flex-direction': 'column'
   },
   bmItem: {
      display: 'inline-block',
   },
   bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)',
   },
};

function BurgerMenu() {
   const [redirect, setRedirect] = useState(false);
   const showSettings = (e) => {
      e.preventDefault();
   };

   function logout() {
      sessionStorage.removeItem('auth');
      setRedirect(true);
   }

   return (
      <Menu styles={styles} width={'280px'}>
         <h5 className="burger-menu-title">Playlists</h5>
         <Playlists></Playlists>
         <button className="logout-btn icon-btn" onClick={logout}><FaDoorOpen/><span>Logout</span></button>
         {redirect && <Redirect to="/Login" />}
      </Menu>
   );
}

export default BurgerMenu;
