import React  from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Form from './components/Form';
import Login from './components/Login';
import HomePage from './pages/HomePage';
import SinglePlaylistPage from './pages/SinglePlaylistPage';
//import Player from './components/Player';
//import SearchBar from './components/SearchBar';
//import SearchRender from './components/SearchRender';
import PlayerContextProvider from './contexts/PlayerContext';
//import Playlists from './components/Playlists';

import './App.css';


function App() {


return (
   <PlayerContextProvider>
      <Router>
         <Route path="/login" component={Login} />
         <Route path="/registerMember" component={Form} />
         <Route path="/" exact component={HomePage} />
         <Route path="/singleplaylistpage" component={SinglePlaylistPage} />
      </Router>
   </PlayerContextProvider>
);
}

export default App;
