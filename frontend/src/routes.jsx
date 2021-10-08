import React from 'react'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import SinglePlaylistPage from './pages/SinglePlaylistPage';

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
			path: '/home/singleplaylist',
			component: SinglePlaylistPage
		}
	]
    }
];

export default routes;