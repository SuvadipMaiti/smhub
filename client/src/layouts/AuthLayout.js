import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <>
      <div className="login-container container">
        <div className="login-middle">
          <ToastContainer autoClose={2000} />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
