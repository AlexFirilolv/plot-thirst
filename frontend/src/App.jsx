import { useEffect, useState } from 'react'
import './App.css'
import Login from './components/authentication/Login'
import Register from './components/authentication/Register'

function App() {

const [ isAuthenticated, setIsAuthenticated ] = useState(false); 

useEffect(() => {
  if (localStorage.getItem('jwt'))
  setIsAuthenticated(true);
}, []);

  return (
    <>
      {isAuthenticated ? <h1>Welcome Back!</h1> : <><h1>Welcome!</h1><Register onAuthSuccess={setIsAuthenticated}/><Login onAuthSuccess={setIsAuthenticated}/> </>}      
    </>
  )
}

export default App
