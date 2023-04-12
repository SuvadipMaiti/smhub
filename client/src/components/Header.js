import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { apiFilepath } from '../helpers/urlConfig';
import { UilSearch } from '@iconscout/react-unicons'

const Header = () => {
  const { auth } = useSelector((state) => state.authReducer);
  let navigate = useNavigate();

  const openSearch = () => {
    navigate('/post/search');
  };

  return (
    <nav>
      <div className="container">
        <div className="logo">
          <Link to={'/'}>
            <img
              src="/assets/images/companylogo.png"
              alt="profile"
              onError={(e) => {
                e.currentTarget.style = 'display:none';
              }}
            />
          </Link>
        </div>
        <div className="search-bar">
          <UilSearch />
          <input type="search" placeholder="Search..." onClick={openSearch} />
        </div>
        <div className="search-icon" onClick={openSearch}>
          <UilSearch />
        </div>
        <div className="create">
          <Link to={'/post/create'}>
            <label htmlFor="create-post" className="btn btn-primary">
              Create
            </label>
          </Link>
          <div className="profile-photo">
            <Link to={auth ? `/profile/page/${auth.id}` : `/login`}>
              <img
                src={
                  auth?.avatarFullUrl
                    ? auth?.avatarFullUrl
                    : auth?.avatar
                    ? apiFilepath + '/uploads/avatar/' + auth?.avatar
                    : '/assets/images/company-logo-1658436134701.png'
                }
                alt="avatar"
                onError={(e) => {
                  e.currentTarget.src = '/assets/images/user.png';
                }}
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
