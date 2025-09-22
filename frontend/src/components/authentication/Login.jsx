import { useState } from 'react'
import './Authentication.css'

function Login() {

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const backendUrl = "http://localhost:3000";

  async function handleLogin(e) {
    e.preventDefault();

    const bodyData = { "email": loginEmail, "password": loginPassword };
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
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input type="email" placeholder="Your email" value={loginEmail} onChange={(event) => setLoginEmail(event.target.value)}/>
        <input type="password" placeholder="Your password" value={loginPassword} onChange={(event) => setLoginPassword(event.target.value)}/>
        <button type="submit">Login</button>
      </form>
    </>
  )
}

export default Login
