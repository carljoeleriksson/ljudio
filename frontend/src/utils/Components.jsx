import React from 'react';
import Signup from '../pages/SignupPage';
import Login from '../pages/LoginPage';
import LandingPage from '../pages/LandingPage';
import SinglePlaylistPage from '../pages/SinglePlaylistPage';
import SearchRender from '../components/SearchRender';

const SearchRenderComponent = () => <SearchRender />
const SinglePlaylistComponent = () => <SinglePlaylistPage />
const LoginComponent = () => <Login />
const RegisterComponent = () => <Signup />
const LandingComponent = () => <LandingPage />

export { SearchRenderComponent, SinglePlaylistComponent, LoginComponent, RegisterComponent, LandingComponent };