import React, { useState } from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from "react-router-dom";
import axiosInstance from '../api/axiosInstance.js';

const MyContext = React.createContext();

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/login', {
        username: formData.username,
        password: formData.password,
      })
      .then((response) => {
        console.log(response)     
        if (response.statusText === "OK") {
          const dataObj = response.data;        
          localStorage.setItem('userId', dataObj.response.userId);
          localStorage.setItem('token', dataObj.response.token);
          window.location = '/products'
        } else {
          alert("Wrong Credentials")
          console.error('Login failed', response);
        }
      })
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
      <div id='loginForm'>
        <div className="login">
          <h2>Login</h2>
      <div>
      <form onSubmit={handleSubmit}>
        <div className='inputFields'>
        <PersonOutlineIcon className='personIcon'/>    
          <input
          type="text"
          className="input-field"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        </div>
        <div className='inputFields'>
          <LockIcon className='personIcon' />
          <input
          type="password"
          className="input-field"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        </div>
        <button type="submit" className="submit-button">Login</button>
      </form>
      </div>
      <div class ='centreLogIn'>
        <text className='centreLogInText'>Or Sign Up Using</text>
        <div>
         <FacebookIcon className='facebookButton'/>
         <TwitterIcon className='twitterButton' />
         <GoogleIcon className='googleButton' />
        </div>
      </div>
      <div className='bottomLogIn'>
        <div><text>Or Sign Up Using </text></div>
        <Link className="text" to = "/register">Sign Up </Link>
      </div>
    </div> 
      </div> 
  );
}

export {MyContext};
export default Login;

