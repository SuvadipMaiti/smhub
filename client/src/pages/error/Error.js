import React from 'react';
import { Link } from 'react-router-dom';
import { UilArrowLeft } from '@iconscout/react-unicons'

const Error = () => {
  return (
    <div style={{height:'100vh',width:'100vw'}} className="profile-page">
      <div className="heading">
        <h4>Error : 404</h4>
      </div>
      <div className="profile-body">
        <img
          src={
            '/assets/images/error.png'
          }
          alt="error"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = '/assets/images/error.png';
          }}
        />
      </div>
      <div className="action">
        <Link to={`/`}>
          <button className="btn btn-primary">
            <UilArrowLeft /> Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
