import { useState } from 'react'
import './App.css'
import Login from './components/authentication/Login'
import Register from './components/authentication/Register'

function App() {

const [ isAuthenticated, setIsAuthenticated ] = useState(false); 

  return (
    <>
      {isAuthenticated ? <h1>Welcome Back!</h1> : <><h1>Welcome!</h1><Register/><Login/> </>}      
    </>
  )
}

export default App
