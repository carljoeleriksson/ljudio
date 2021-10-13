import React  from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { render } from 'react-dom';
import { 
   LoginComponent, 
   RegisterComponent, 
   SearchRenderComponent, 
   SinglePlaylistComponent,
   LandingComponent 
} from './utils/Components'

import PlayerContextProvider from './contexts/PlayerContext';
import SearchContextProvider from './contexts/SearchContext';

import { DashboardLayout, SinglePageLayout, SharedPlaylistLayout } from './utils/Layouts';

import './App.css';

function RouteWrapper({
   component: Component, 
   layout: Layout, 
   ...rest
 }) {
   return (
     <Route {...rest} render={(props) =>
       <Layout {...props}>
         <Component {...props} />
       </Layout>
     } />
   );
 }

function App() {

   return (
      <PlayerContextProvider>
      <SearchContextProvider>
      <Router>
         <Switch>
            <RouteWrapper path="/login" component={LoginComponent} layout={SinglePageLayout} />
            <RouteWrapper path="/register" component={RegisterComponent} layout={SinglePageLayout} />
            <RouteWrapper path="/search" component={SearchRenderComponent} layout={DashboardLayout} />
            <RouteWrapper path="/singleplaylistpage/:playlistId/:playlistName/:code" component={SinglePlaylistComponent} layout={SharedPlaylistLayout} />
            <RouteWrapper path="/singleplaylistpage/:playlistId/:playlistName/" component={SinglePlaylistComponent} layout={DashboardLayout} />
            <RouteWrapper path="/" component={LandingComponent} layout={DashboardLayout} />
         </Switch>
      </Router>
      </SearchContextProvider>
      </PlayerContextProvider>
   );
}

export default App;

