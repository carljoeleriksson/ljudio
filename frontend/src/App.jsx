import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Form from './components/Form';
import Login from './components/Login';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
   return (
      <div className="App">
         <Router>
            <Route path="/registerMember" component={Form} />
            <Route path="/login" component={Login} />
            <Route path="/" exact component={HomePage} />
         </Router>
      </div>
   );
}

export default App;
