
import { useState } from 'react';
import './App.css';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {

  const [user , setLoginUser] = useState({});

  return (
    <div className="App">
      <Router>
        <Routes>
          {user && user._id ? <Route exact path='/' element={<Home setLoginUser={setLoginUser}/>}/> : <Route exact path='/' element={<Login setLoginUser={setLoginUser}/>}/>}
          <Route exact path='/login' element={<Login setLoginUser={setLoginUser}/>}/>
          <Route exact path='/register' element={<Signup/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
