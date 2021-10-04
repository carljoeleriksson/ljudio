import React  from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Form from './components/Form';
import Login from './components/Login';
import HomePage from './pages/HomePage';
import SinglePlaylistPage from './pages/SinglePlaylistPage';
import PlayerContextProvider from './contexts/PlayerContext';
import SearchContextProvider, { SearchContext } from './contexts/SearchContext';

import './App.css';


function App() {

   return (
      <PlayerContextProvider>
      <SearchContextProvider>
         <Router>
            <Route path="/login" component={Login} />
            <Route path="/registerMember" component={Form} />
            <Route path="/" exact component={HomePage} />
            <Route path="/singleplaylistpage" component={SinglePlaylistPage} />
         </Router>
      </SearchContextProvider>
      </PlayerContextProvider>
   );
}

export default App;
