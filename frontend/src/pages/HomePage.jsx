import React, { useState, createContext, useContext } from 'react';
import { Switch, Link } from 'react-router-dom';
import RouteWithSubRoutes from './utils/RouteWithSubRoutes';

import SearchBar from '../components/SearchBar';
import SearchRender from '../components/SearchRender';
import Player from '../components/Player';
import BurgerMenu from '../components/BurgerMenu'
import IsLoggedIn from '../components/IsLoggedIn';

import SinglePlaylistPage from './SinglePlaylistPage';

import { SearchContext } from '../contexts/SearchContext';

export const GeneralContext = createContext();

//CONTINUE FROM https://dev.to/ms_yogii/react-router-a-simple-tutorial-on-nested-routes-1237
//AT HERE IS OUR HOME COMPONENT:
function Home() {
   
   const [playlists, setPlaylists] = useState([]);
   const {searchState, updateSearchState} = useContext(SearchContext);
   const searchResult = searchState.searchResult;


   return (
      <GeneralContext.Provider value={[playlists, setPlaylists]}>
      
         <IsLoggedIn />
         <div id="wrapper">
            <header>
               <img className="logo-header" src="../../assets/logo.svg" alt="Logo" />
               <SearchBar />
            </header>
            <main>
               
               {mainContent === 'SearchRender' && searchResult && <SearchRender />}
               {mainContent === 'SinglePlaylistPage' && <SinglePlaylistPage />}

            </main>
            <BurgerMenu />
            <Player></Player>
         </div>
      </GeneralContext.Provider>
   )
}

export default Home;
