import React  from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Signup from './pages/Signup';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import SinglePlaylistPage from './pages/SinglePlaylistPage';

import SearchBar from './components/SearchBar';
import SearchRender from './components/SearchRender';
import IsLoggedIn from './components/IsLoggedIn'
import BurgerMenu from './components/BurgerMenu'
import Player from './components/Player';

import PlayerContextProvider from './contexts/PlayerContext';
import SearchContextProvider from './contexts/SearchContext';

import routes from '../utils/Routes';

import './App.css';



function App() {

   return (
      <PlayerContextProvider>
      <SearchContextProvider>
      <Router>
         {/*
         <Switch>
            {routes.map((route, i) => (
               <RouteWithSubRoutes key={i} {...route} />
            ))}
            */}
            <Route path="/login" component={Login} />
            <Route path="/registerMember" component={Signup} />
            <Route path="/" exact component={HomePage} />
            
         {/* </Switch> */}
      </Router>
      </SearchContextProvider>
      </PlayerContextProvider>
   );
}

export default App;
