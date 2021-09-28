import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
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
        <Route path='/login' component={Login} />
        <Route path='/registerMember' component={Form} />
        <Route exact path='/' component={HomePage} />
        <main>
          <Route path='/SearchRender' component={SearchRender}></Route>
          <Route path='/singlePlaylistPage' component={SinglePlaylistPage} />
        </main>
      </Router>
    </PlayerContextProvider>
  );
}

export default App;
