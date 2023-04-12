import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import Layout from './layouts/Layout';
import AuthLayout from './layouts/AuthLayout';
import PageSpinner from './components/PageSpinner';
import * as url from './helpers/url';
import {
  Dashboard,
  Profile,
  ProfilePage,
  Register,
  Login,
  Theme,
  Error,
} from "./routes/Routes.js";


function App() {

  const { auth } = useSelector((state) => state.authReducer);
  return (
    <BrowserRouter basename={url.dashboard()}>
      <React.Suspense fallback={<PageSpinner />}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path={url.dashboard()} name="dashboard" element={<Dashboard />} />
            <Route path={url.theme()} name="/theme" element={<Theme />} />
          </Route>
          <Route element={<Layout />}>
            <Route
              path={url.profilePageByProfileId(':profileid')}
              name="profilepage"
              element={auth ? <ProfilePage /> :<Navigate to={url.login()} /> }
            />
            <Route path={url.profile()} name="/profile" element={<Profile />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route
              path={url.login()}
              name="login"
              element={auth ? <Navigate to={url.dashboard()} /> : <Login />}
            />
            <Route
              path={url.register()}
              name="register"
              element={auth ? <Navigate to={url.dashboard()} /> : <Register />}
            />
          </Route>
          <Route path="*" name="error" element={<Error />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
