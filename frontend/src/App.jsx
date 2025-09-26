import { useEffect, useState } from 'react'
import api from './api/api.js'
import './App.css'
import Login from './components/authentication/Login'
import Register from './components/authentication/Register'
import { Navbar01 } from './components/ui/shadcn-io/navbar-01'

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
      <Navbar01 isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
      {isAuthenticated ? <h1>Welcome Back!</h1> : <><h1>Welcome!</h1><Register onAuthSuccess={setIsAuthenticated}/><Login onAuthSuccess={setIsAuthenticated}/> </>}      
    </>
  )
}

export default App
