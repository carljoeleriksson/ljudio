import React, { useState, createContext } from 'react';

import SearchBar from '../components/SearchBar';
import Player from '../components/Player';
import BurgerMenu from '../components/BurgerMenu'
import IsLoggedIn from '../components/IsLoggedIn';
import { Link } from 'react-router-dom';

export const GeneralContext = createContext();

const SinglePageLayout = ({children}) => 
	<> 
		{children}
	</>;

const SharedPlaylistLayout = ({children}) => 
	<div className="sharedplaylist-wrapper"> 
		<div className="sharedplaylist-header">
			<img className="logo-header" src="../../assets/logo.svg" alt="Logo" />
			<button><Link to="/register"></Link></button>
		</div>
		{children}
		<Player></Player>
	</div>;

function DashboardLayout ({children}){
	const [playlists, setPlaylists] = useState([]);

	return (
		<GeneralContext.Provider value={[playlists, setPlaylists]}>
		<IsLoggedIn />
		<div id="wrapper">
			<header>
				<img className="logo-header" src="../../assets/logo.svg" alt="Logo" />
				<SearchBar />
			</header>
			<main>
				{children}	
			</main>
			<BurgerMenu />
			<Player></Player>
		</div>
		</GeneralContext.Provider>
	)
}

export { SinglePageLayout, SharedPlaylistLayout, DashboardLayout };