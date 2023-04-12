import React, { useEffect, useState } from 'react';
import { googleLogout } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiFilepath, googleClientId } from '../../helpers/urlConfig';
import { setLogout, profileUpdateAsync } from '../../redux/slices/AuthSlice';
import { UilUserSquare } from '@iconscout/react-unicons'
import { UilSignout } from '@iconscout/react-unicons'

const Profile = () => {
  let navigate = useNavigate();

  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.authReducer);
  const [id] = useState(auth?.id);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    setName(auth?.name);
  }, [auth]);

  const fileUpload = (e) => {
    setAvatar(e.target.files[0]);
  };

  const profileUpdate = async (e) => {
    e.preventDefault();
    const profileData = new FormData();
    profileData.append('name', name);
    profileData.append('avatar', avatar);
    dispatch(profileUpdateAsync({ id, profileData, navigate, toast }));
  };

  const handleLogout = () => {
    dispatch(setLogout());
    toast.success('logout sucessfull');
    navigate('/login');
  };

  const facebookLogout = () => {
    dispatch(setLogout());
    toast.success('logout sucessfull');
    navigate('/login');
  };

  const googleLogoutFun = (resp) => {
    console.log(resp);
    dispatch(setLogout());
    googleLogout();
    toast.success('logout sucessfull');
    navigate('/login');
  };

  return (
    <>
      <div className="loginform">
        <form encType="multipart/form-data">
          <div className="heading">
            <UilUserSquare/>
            <h4>Profile : {name}</h4>
          </div>
          {auth && auth.googleId ? (
            <div className="heading">
              {googleClientId && (
                <div className="heading" onClick={() => googleLogoutFun()}>
                <UilSignout style={{ color: 'red' }}/>
                <h4>Google Log Out</h4>
              </div>
              )}
            </div>
          ) : auth && auth.facebookId ? (
            <div className="heading" onClick={() => facebookLogout()}>
              <UilSignout style={{ color: 'red' }}/>
              <h4>Facebook Log Out</h4>
            </div>
          ) : (
            <div className="heading" onClick={() => handleLogout()}>
              <UilSignout style={{ color: 'red' }}/>
              <h4>Log Out</h4>
            </div>
          )}
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Namr"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Avatar</label>
            <input
              type="file"
              placeholder="Avatar"
              className="form-control"
              onChange={fileUpload}
            />
            {auth?.avatar && (
              <img
                src={
                  auth?.avatarFullUrl
                    ? auth?.avatar
                    : apiFilepath + '/uploads/avatar/' + auth?.avatar
                }
                alt={auth?.name}
                style={{ width: '50px', height: '50px' }}
                onError={(e) => {
                  e.currentTarget.src = '/assets/images/user.png';
                }}
              />
            )}
          </div>
          <div className="action">
            <button className="btn btn-primary" onClick={profileUpdate}>
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
