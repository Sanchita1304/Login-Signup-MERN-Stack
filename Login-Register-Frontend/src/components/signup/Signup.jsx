import React, {useState} from 'react'
import './signup.css'
import axios from 'axios'

import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const navigate = useNavigate();
    const [user , setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser({
            ...user,
            [name] : value
        });
    }

    const register = () => {
      const {name, email, password, reEnterPassword} = user;

      if(name && email && password && (password === reEnterPassword)){
        axios.post('http://localhost:8000/register', user)
        .then((res) => {
         alert(res.data.message);
         navigate('/login');
        })
        .catch((error) => {
          console.error(error);
          alert('An error occured during registration');
        });
      } else{
        alert("Invalid Data");
      }
     

    }

  return (
    <div className='register'>
      <h1>Register</h1>
        <input type="text" name="name" value={user.name} placeholder='Enter Your Name' onChange={handleChange} />
        <input type="email" name="email" value={user.email} placeholder='Enter Your Email' onChange={handleChange} />
        <input type="password" name="password" value={user.password} placeholder='Enter Your Password' onChange={handleChange} />
        <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder='Re-enter Password' onChange={handleChange} />
        <div className="button" onClick={register}>Register</div>
        <div>or</div>
        <div className="button" onClick={() => navigate('/login')}>login</div>
    </div>
  )
}

export default Signup
