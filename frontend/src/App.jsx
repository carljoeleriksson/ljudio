import React  from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import SearchBar from './components/SearchBar';
import SearchRender from './components/SearchRender';
import IsLoggedIn from './components/IsLoggedIn'
import BurgerMenu from './components/BurgerMenu'
import Player from './components/Player';
import SinglePlaylistPage from './pages/SinglePlaylistPage';
import PlayerContextProvider from './contexts/PlayerContext';
import SearchContextProvider from './contexts/SearchContext';



import './App.css';



function App() {

   return (
      <PlayerContextProvider>
      <SearchContextProvider>
         <Switch>
            {routes.map((route, i) => (
               <RouteWithSubRoutes key={i} {...route} />
            ))}

            {/*
            <Route path="/login" component={Login} />
            <Route path="/registerMember" component={Signup} />
            <Route path="/" exact component={HomePage} />
            */}
            
         </Switch>
      </SearchContextProvider>
      </PlayerContextProvider>
   );
}

export default App;
