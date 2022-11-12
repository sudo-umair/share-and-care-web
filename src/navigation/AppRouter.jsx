import React from 'react';
import NavBar from '../components/UI/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from '../routes/Signin';
import Signup from '../routes/Signup';
import Home from '../routes/Home';
import { useSelector } from 'react-redux';
import Account from '../routes/Account';
import UpdateAccount from '../routes/UpdateAccount';
import UpdatePassword from '../routes/UpdatePassword';
import ForgotPassword from '../routes/ForgotPassword';

export default function AppRouter() {
  const { isLoggedIn } = useSelector((state) => state.hospital);
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Signin />} />
        <Route path='/sign-up' element={<Signup />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/home' element={isLoggedIn ? <Home /> : <Signin />} />
        <Route
          path='/account'
          element={isLoggedIn ? <Account /> : <Signin />}
        />
        <Route
          path='/update-account'
          element={isLoggedIn ? <UpdateAccount /> : <Signin />}
        />
        <Route path='/update-password' element={<UpdatePassword />} />
        <Route path='*' element={<h1>404</h1>} />
      </Routes>
    </Router>
  );
}
