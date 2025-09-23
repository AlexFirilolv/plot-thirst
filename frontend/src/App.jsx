import { useEffect, useState } from 'react'
import api from './api/api.js'
import './App.css'
import Login from './components/authentication/Login'
import Register from './components/authentication/Register'

function App() {

const [ isAuthenticated, setIsAuthenticated ] = useState(false); 

useEffect(() => {
  async function verifySession(){
    try {
      await api.get('/verify_token');
      setIsAuthenticated(true);
    }
    catch (error) {
      setIsAuthenticated(false);
    }
  }
  verifySession();
}, []);

  return (
    <>
      {isAuthenticated ? <h1>Welcome Back!</h1> : <><h1>Welcome!</h1><Register onAuthSuccess={setIsAuthenticated}/><Login onAuthSuccess={setIsAuthenticated}/> </>}      
    </>
  )
}

export default App
