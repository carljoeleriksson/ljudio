import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Form from './components/Form';
import Login from './components/Login';
import HomePage from './pages/HomePage';
import SinglePlaylistPage from './pages/SinglePlaylistPage';
import Player from './components/Player';
import SearchBar from './components/SearchBar';
import SearchRender from './components/SearchRender';
import PlayerContextProvider from './contexts/PlayerContext';
import Playlists from './components/Playlists';

import './App.css';


function App() {

   const [searchResult, setSearchResult] = useState();
   const [searchTerm, setSearchTerm] = useState('');
   const [searchType, setSearchType] = useState('search');

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
      <PlayerContextProvider>
         <Router>
         <div id="wrapper">
            <Route path="/registerMember" component={Form} />
            <Route path="/login" component={Login} />
            <Route path="/" exact component={HomePage} />

         <header>
            <img className="logo-header" src="/assets/logo.svg" alt="Logo" />
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
            <Route path="/singleplaylistpage" component={SinglePlaylistPage} />
         </main>
         <aside id="playlist-sidebar">
         <Playlists></Playlists>
         </aside>
         <Player></Player>
      </div>
      </Router>
      </PlayerContextProvider>
   );
}

export default App;
