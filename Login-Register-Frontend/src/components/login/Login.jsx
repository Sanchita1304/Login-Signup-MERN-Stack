import React, {useState} from 'react'
import './login.css'
import axios from 'axios';

  import { useNavigate } from 'react-router-dom';

 
  

const Login = ({setLoginUser}) => {
    const navigate = useNavigate();
    const [user , setUser] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser({
            ...user,
            [name] : value
        });
    }

    const login = () => {
        const {email, password} = user;

        if(email && password){
            axios.post('http://localhost:8000/login', user)
            .then((res) => {
               alert(res.data.message);
               setLoginUser(res.data.result)
               navigate('/');
            })
        }else {
            alert("Invalid data")
        }
        
    }

  return (
    
      <div className="login">
        <h1>Login</h1>
        <input type="email" name="email" value={user.email} placeholder='Enter Your Email'  onChange={handleChange}/>
        <input type="password" name="password" value={user.password} placeholder='Enter Your Password' onChange={handleChange} />
        <div className="button" onClick={login}>Login</div>
        <div>or</div>
        <div className="button" onClick={() => navigate('/register')}>Register</div>
        
      </div>
    
  )
}

export default Login
