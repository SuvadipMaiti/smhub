import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerAsync } from '../../redux/slices/AuthSlice';
import { UilLock } from '@iconscout/react-unicons'

const Register = () => {
  let url = '#';
  let navigate = useNavigate();

  const dispatch = useDispatch();


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUpSubmit = (event) => {
    event.preventDefault();
    const userData = {
      name,
      email,
      password,
    };
    dispatch(registerAsync({userData,navigate,toast}));
  };

  return (
    <>
      <div className="loginform">
        <form>
          <div className="heading">
            <UilLock/>
            <h4>Register Form</h4>
          </div>
          <div className="form-group">
            <label>Name</label>
            <input type="text" placeholder="Name" className="form-control" onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
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
            <button className="btn btn-primary" onClick={signUpSubmit} >Register</button>
          </div>
        </form>
        <div className="social-login front-small">
          <a href='/login' className="btn btn-primary">Login</a>
          <a href={url} className="btn">Forgot Password</a>
        </div>
      </div>
    </>
  );
};

export default Register;
