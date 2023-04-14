import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import FacebookLoginComponent from '../../components/FacebookLoginComponent';
import GoogleLoginComponent from '../../components/GoogleLoginComponent';
import { loginAsync } from '../../redux/slices/AuthSlice';
import { gapi } from 'gapi-script';
import { UilLockOpenAlt } from '@iconscout/react-unicons';

const Login = () => {
  let url = '#';
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          '252000336971-arqb03m2qj1r7onavl9627jarqqorbpq.apps.googleusercontent.com',
        scope: '',
      });
    }
    gapi.load('client:auth2', start);
  });

  const loginSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(loginAsync({ userData, navigate, toast }));
  };

  return (
    <>
      <div className="loginform">
        <form>
          <div className="heading">
            <UilLockOpenAlt />
            <h4>Login Form</h4>
          </div>
          {/* <!-- search bar --> */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="action">
            <button className="btn btn-primary" onClick={loginSubmit}>
              Login
            </button>
          </div>
        </form>
        <div className="social-icon">
          {/* <FacebookLoginComponent /> */}
          <GoogleLoginComponent />
        </div>
        <div className="social-login front-small">
          <Link to={'/register'} className="btn btn-primary">
            Register
          </Link>
          <Link to={'/'} className="btn">
            Forgot Password
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
