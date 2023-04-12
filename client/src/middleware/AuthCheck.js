import { useDispatch, useSelector } from 'react-redux';
// import { authAsync } from '../redux/slices/AuthSlice';
import { setLogout } from '../redux/slices/AuthSlice';
import jwt_decode from 'jwt-decode';
import { useEffect } from 'react';
// import { toast } from 'react-toastify';

const AuthCheck = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.authReducer);
  // useEffect(()=>{
  //     dispatch(authAsync({toast,dispatch}));
  // },[dispatch]);

  useEffect(()=>{
    if (auth && auth.token) {
      const decodedToken = jwt_decode(auth.token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(setLogout());
      }
    }
  },[dispatch,auth]);

};

export default AuthCheck;
