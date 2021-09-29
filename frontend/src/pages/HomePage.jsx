import React, { useState, createContext} from 'react';

import SearchBar from '../components/SearchBar';
import SearchRender from '../components/SearchRender';
import Playlists from '../components/Playlists';
import Player from '../components/Player';
import PlayerContextProvider from '../contexts/PlayerContext';
import IsLoggedIn from '../components/IsLoggedIn';
//import SinglePlaylistPage from '/SinglePlaylistPage';

export const GeneralContext = createContext();


function Home() {
   const [searchResult, setSearchResult] = useState();
   const [searchTerm, setSearchTerm] = useState('');
   const [searchType, setSearchType] = useState('search');
   const [playlists, setPlaylists] = useState([]);



   async function fetchSearchResult(e) {
      e.preventDefault();
      console.log('searchType: ' + searchType);

      const response = await fetch('/api/search', {
         method: 'POST',
         body: JSON.stringify({
            searchType: searchType,
            keyWord: searchTerm,
         }),
         headers: {
            'Content-Type': 'application/json',
         },
      });
      const data = await response.json();

      if (data) {
         setSearchResult(data.content);
      } else {
         console.log('Failed to fetch. Got no data from backend.');
      }
   }

   return (
      <GeneralContext.Provider value={[playlists, setPlaylists]}>

         <IsLoggedIn />
         <div id="wrapper">

            <header>
               <img className="logo-header" src="../../assets/logo.svg" alt="Logo" />
               <SearchBar
                  onChange={(e) => {
                     console.log(e.target.value);

                     if (e.target.type == 'text') {
                        setSearchTerm(e.target.value);
                     } else {
                        setSearchType(e.target.value);
                     }
                  }}
                  onClick={fetchSearchResult}
               />
            </header>

            <main>
               {searchResult && <SearchRender result={searchResult} />}
            </main>

            <aside id="playlist-sidebar">
               <Playlists></Playlists>
            </aside>

            <Player></Player>

         </div>
      </GeneralContext.Provider>


   );
}

export default Home;
