import { color } from '@mui/system';
import React from 'react'
import { slide as Menu } from 'react-burger-menu'
import Playlists from './Playlists';

const styles = {
	bmBurgerButton: {
	  position: 'fixed',
	  width: '26px',
	  height: '20px',
	  left: '15px'
	},
	bmBurgerBars: {
	  background: '#01a5af'
	},
	bmBurgerBarsHover: {
	  background: '#a90000'
	},
	bmCrossButton: {
	  height: '24px',
	  width: '24px'
	},
	bmCross: {
	  background: '#01a5af'
	},
	bmMenuWrap: {
	  position: 'fixed',
	  height: '100%'
	},
	bmMenu: {
	  background: 'rgba(0, 0, 0, 0.75)',
	  padding: '0 1.5em 0 0',
	  fontSize: '1.15em'
	},
	bmMorphShape: {
	  fill: '#373a47'
	},
	bmItemList: {
	  color: '#b8b7ad',
	  padding: '0.8em',
	  
	},
	bmItem: {
	  display: 'inline-block'
	},
	bmOverlay: {
	  background: 'rgba(0, 0, 0, 0.3)'
	}
  }

function BurgerMenu() {
	const showSettings = (e) => {
		e.preventDefault();
	}
	return (
		<Menu styles={ styles } width={'280px'} >
			<Playlists></Playlists>
      	</Menu>
	)
}

export default BurgerMenu