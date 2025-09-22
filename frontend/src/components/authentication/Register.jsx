import { useState } from 'react'
import './Authentication.css'

function Register( { onAuthSuccess } ) {

  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  
  const backendUrl = "http://localhost:3000";

  async function handleRegister(e) {
    e.preventDefault();

    const bodyData = { "email": registerEmail, "password": registerPassword };
    const stringifiedBody = JSON.stringify(bodyData);

    try {

      const response = await fetch(`${backendUrl}/register`,
        { "method": 'POST', "headers": { 'Content-Type': 'application/json' }, "body": stringifiedBody});

      const data = await response.json();

      if(response.ok) {
        localStorage.setItem('jwt', data.jwt)
        alert(data.message);
        onAuthSuccess(true);
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
        <h2>Register</h2>
        <input type="email" placeholder="Your email" value={registerEmail} onChange={(event) => setRegisterEmail(event.target.value)}/>
        <input type="password" placeholder="Your password" value={registerPassword} onChange={(event) => setRegisterPassword(event.target.value)}/>
        <button type="submit">Register</button>
      </form>
    </>
  )
}

export default Register
