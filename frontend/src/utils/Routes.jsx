import React from 'react'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import SinglePlaylistPage from './pages/SinglePlaylistPage';

import SearchRender from './components/SearchRender';




const routes = [
    {
    path: '/login',
    component: Login,
    },
    {
    path: '/home',
    component: HomePage,
	//Added nested routes
	routes: [
        {
            path: '/home/search',
            component: SearchRender
        },
		{   
			path: '/home/singleplaylist',
			component: SinglePlaylistPage
		}
	]
    }
];

export default routes;