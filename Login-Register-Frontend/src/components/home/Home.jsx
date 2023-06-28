import React from 'react'
import './home.css'

const Home = ({setLoginUser}) => {
  return (
    <div className='homepage'>
     <h1>Hello Homepage</h1>
     <div className="button" onClick={() => setLoginUser({})}>Logout</div>
    </div>
  )
}

export default Home
