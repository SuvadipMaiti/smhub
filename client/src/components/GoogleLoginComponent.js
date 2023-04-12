import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { loginGoogleAsync } from '../redux/slices/AuthSlice.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { googleClientId } from '../helpers/urlConfig.js';
import jwt_decode from "jwt-decode";

const GoogleLoginComponent = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
  
    const onSuccess = (response) => {
      if(response && response.credential){
        var credential = response.credential;
        // console.log(response);
        const resp = jwt_decode(credential);
        // console.log(resp);
        const userData = {
          name: resp?.name,
          email: resp?.email,
          googleAvatar: resp?.picture,
          token: resp?.jti,
          googleId: resp?.sub,
        };
        dispatch(loginGoogleAsync({ userData, navigate, toast }));
      }  
    };
    const onFailure = (err) => {
      console.log(err);
    };

  return (
    <>
      {googleClientId && (
        <GoogleOAuthProvider
          clientId={googleClientId}
        >
          <GoogleLogin
            render={(renderProps) => (
              <button
                type="button"
                className=""
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Sign in with google
              </button>
            )}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy="single_host_origin"
          />
        </GoogleOAuthProvider>
      )}
    </>
  );
};

export default GoogleLoginComponent;
