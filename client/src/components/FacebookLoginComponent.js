import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginFacebookAsync } from '../redux/slices/AuthSlice';
import { toast } from 'react-toastify';
import { facebookClientId } from '../helpers/urlConfig';
// https://aaryanadil.com/react-social-login-tutorial-google-facebook-and-twitter-oauth2

const FacebookLoginComponent = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const callback = (resp) => {
    console.log(resp);
    const userData = {
      name: resp?.name,
      email: resp?.email,
      token: resp?.accessToken,
      facebookId: resp?.id,
      facebookAvatar: resp?.picture?.data?.url,
    };
    dispatch(loginFacebookAsync({ userData, navigate, toast }));
  };

  const onFailure = (resp) => {
    console.log(resp);
  };
  return (
    <>
      {facebookClientId && (
        <FacebookLogin
          appId={facebookClientId}
          autoLoad={false}
          fields="name,email,picture"
          callback={callback}
          onFailure={onFailure}
          cssClass="my-facebook-button-class btn"
          icon="fa-facebook"
        />
      )}
    </>
  );
};

export default FacebookLoginComponent;
