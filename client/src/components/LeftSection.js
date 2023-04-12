import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { apiFilepath } from '../helpers/urlConfig';
import { NavLink } from 'react-router-dom';
import { UilUsersAlt } from '@iconscout/react-unicons'
import { UilPalette } from '@iconscout/react-unicons'
import { UilChat } from '@iconscout/react-unicons'
import { UilHome } from '@iconscout/react-unicons'
import { UilBag } from '@iconscout/react-unicons'

const LeftSection = () => {

  const { auth } = useSelector((state) => state.authReducer);

  return (
    <div className="left">
      {auth?.name && (
        <div className="profile" id="open-sidebar">
          <div className="profile-photo">
            <Link to={`/profile/page/${auth.id}`}>
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
          <div className="handle">
            <h4>{auth.name}</h4>
            <p className="text-muted">{auth.username}</p>
          </div>
        </div>
      )}
      {/* <!-- ----------- SIDEBAR ------------------ --> */}
      <div className="sidebar">
        <NavLink to={'/'} className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}>
          <span>
            <UilHome/>
          </span>
          <h3>Home</h3>
        </NavLink>
        <NavLink to={'/service'} className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}>
          <span>
            <UilBag/>
          </span>
          <h3>Service</h3>
        </NavLink>
        <NavLink to={'/chat'} className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}>
          <span>
            <UilChat/>
          </span>
          <h3>Chat</h3>
        </NavLink>
        <NavLink to={'/follower'} className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}>
          <span>
            <UilUsersAlt/>
          </span>
          <h3>Followers</h3>
        </NavLink>
        <NavLink to={'/theme'} className={({ isActive }) => isActive ? 'menu-item active' : 'menu-item'}>
          <span>
            <UilPalette/>
          </span>
          <h3>Theme</h3>
        </NavLink>
      </div>
      {/* <!-- ----------- END SIDEBAR ------------------ --> */}
      {/* <!-- ----------- LEFT POST BTN ------------------ --> */}
      <label htmlFor="create-post" className="btn btn-primary">
        Create Post
      </label>
      {/* <!-- ----------- END LEFT POST BTN ------------------ --> */}
    </div>
  );
};

export default LeftSection;
