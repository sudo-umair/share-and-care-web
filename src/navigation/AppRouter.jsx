import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider as AvatarProvider } from 'react-avatar';
import { useSelector } from 'react-redux';
//navbar
import NavBar from '../components/UI/Navbar';
//routes
import Signin from '../routes/Signin';
import Signup from '../routes/Signup';
import Home from '../routes/Home';
import UpdateAccount from '../routes/UpdateAccount';
import UpdatePassword from '../routes/UpdatePassword';
import ForgotPassword from '../routes/ForgotPassword';
import Resources from '../routes/Resources';
import ResourceRequest from '../routes/ResourceRequest';

export default function AppRouter() {
  const { isLoggedIn } = useSelector((state) => state.hospital);
  return (
    <Router>
      <AvatarProvider>
        <NavBar />
      </AvatarProvider>
      <Routes>
        <Route path='/' element={<Signin />} />
        <Route path='/sign-up' element={<Signup />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />

        <Route path='/home' element={isLoggedIn ? <Home /> : <Signin />} />
        <Route
          path='/update-account'
          element={isLoggedIn ? <UpdateAccount /> : <Signin />}
        />
        <Route
          path='/update-password'
          element={isLoggedIn ? <UpdatePassword /> : <Signin />}
        />
        <Route
          path='/resources'
          element={isLoggedIn ? <Resources /> : <Signin />}
        />
        <Route
          path='/resource-request'
          element={isLoggedIn ? <ResourceRequest /> : <Signin />}
        />
        <Route path='*' element={<h1>404</h1>} />
      </Routes>
    </Router>
  );
}
