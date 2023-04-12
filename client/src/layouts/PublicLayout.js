import React from 'react';
import Header from '../components/Header';
import LeftSection from '../components/LeftSection';
import RightSection from '../components/RightSection';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <>
      {/* <!-- -----------NAVBAR ------------------ --> */}
      <Header />
      {/* <!-- -----------END NAVBAR ------------------ --> */}
      {/* <!-- ----------- MAIN ------------------ --> */}
      <main>
        <div className="container">
          {/* <!-- ----------- LEFT ------------------ --> */}
          <LeftSection />
          {/* <!-- -----------END LEFT ------------------ --> */}
          {/* <!-- ----------- MIDDLE ------------------ --> */}

          <div className="middle">
            <ToastContainer autoClose={2000} />
            <Outlet />
          </div>
          {/* <!-- -----------END MIDDLE ------------------ --> */}
          {/* <!-- ----------- RIGHT ------------------ --> */}
          <RightSection />
          {/* <!-- -----------END RIGHT ------------------ --> */}
        </div>
      </main>
      {/* <!-- -----------END MAIN ------------------ --> */}
    </>
  );
};

export default PublicLayout;
