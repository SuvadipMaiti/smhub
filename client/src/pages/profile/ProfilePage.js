import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiFilepath } from '../../helpers/urlConfig';
import { profileDetailsAsync } from '../../redux/slices/AuthSlice';
import { UilEdit } from '@iconscout/react-unicons'

const ProfilePage = () => {

  let navigate = useNavigate();
  const { profileid } = useParams();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.authReducer);
  const [id] = useState(auth?.id);
  const { profileDetails } = useSelector((state) => state.authReducer);

  useEffect(() => {
    dispatch(profileDetailsAsync({ profileid, navigate, toast }));
  }, [profileid, dispatch, navigate]);





  return (
    <>
      <div className="profile-page">
        <div className="heading">
          <h4>Profile</h4>
        </div>
        <img
          src={
            profileDetails?.avatarFullUrl
              ? profileDetails?.avatarFullUrl
              : profileDetails?.avatar
              ? apiFilepath + '/uploads/avatar/' + profileDetails?.avatar
              : '/assets/images/company-logo-1658436134701.png'
          }
          alt="avatar"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = '/assets/images/user.png';
          }}
        />
        <div>{profileDetails?.name}</div>
        <div>{profileDetails?.email}</div>
        <div className="action front-small">
          {parseInt(profileid) === parseInt(id) && (
            <Link to={'/profile'}>
              <div className="btn btn-primary">
                <UilEdit/> Profile Edit
              </div>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
