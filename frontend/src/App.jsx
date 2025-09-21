import { useState } from 'react'
import './App.css'

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const backendUrl = "http://localhost:3000";

  async function handleRegister(e) {
    e.preventDefault();

    const bodyData = { email, password };
    const stringifiedBody = JSON.stringify(bodyData);

    try {

      const response = await fetch(`${backendUrl}/register`,
        { "method": 'POST', "headers": { 'Content-Type': 'application/json' }, "body": stringifiedBody});

      const data = await response.json();

      if(response.ok) {
        localStorage.setItem('jwt', data.jwt)
        alert(data.message);
      }
      
      if(!response.ok) {
        alert(data.message);
      }

    } catch(error) {
      alert("Oops! An error occured, please try again later")
    }
  }

  async function handleLogin(e) {
    e.preventDefault();

    const bodyData = { email, password };
    const stringifiedBody = JSON.stringify(bodyData);

    try {

      const response = await fetch(`${backendUrl}/login`,
        { "method": 'POST', "headers": { 'Content-Type': 'application/json' }, "body": stringifiedBody});

      const data = await response.json();

      if(response.ok) {
        localStorage.setItem('jwt', data.jwt)
        alert(data.message);
      }
      
      if(!response.ok) {
        alert(data.message);
      }

    } catch(error) {
      alert("Oops! An error occured, please try again later")
    }
  }

  return (
    <>
      <form onSubmit={handleRegister}>
        <h1>Register</h1>
        <input type="email" placeholder="Your email" value={email} onChange={(event) => setEmail(event.target.value)}/>
        <input type="password" placeholder="Your password" value={password} onChange={(event) => setPassword(event.target.value)}/>
        <button type="submit">Register</button>
      </form>

      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <input type="email" placeholder="Your email" value={email} onChange={(event) => setEmail(event.target.value)}/>
        <input type="password" placeholder="Your password" value={password} onChange={(event) => setPassword(event.target.value)}/>
        <button type="submit">Login</button>
      </form>
    </>
  )
}

export default App
