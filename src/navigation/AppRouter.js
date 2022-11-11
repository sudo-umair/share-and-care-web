import React from 'react';
import NavBar from '../components/UI/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from '../routes/Signin';
import Signup from '../routes/Signup';
import Home from '../routes/Home';
import { useSelector } from 'react-redux';

export default function AppRouter() {
  const { isLoggedIn } = useSelector((state) => state.hospital);
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Signin />} />
        <Route path='/sign-up' element={<Signup />} />
        <Route
          path='/home'
          element={isLoggedIn === true ? <Home /> : <Signin />}
        />
        <Route path='*' element={<h1>404</h1>} />
      </Routes>
    </Router>
  );
}
