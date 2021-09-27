import React from 'react'
import { useState } from 'react';
import Axios from "axios";
import "../styling/LoginFormStyle.css"

function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const confirmLogin = () => {
        Axios.post("http://localhost:3001/api/auth/login", {
            email: email,
            password: password
        }).then(() => {
            console.log("Success!");
        })
        
    }
    
    return (
      <form className="loginForm" onSubmit={confirmLogin}>
          <p>Email</p>
          <input type="email" required onChange={(e) => setEmail(e.target.value)}></input>

          <p>Password</p>
          <input type="password" required onChange={(e) => setPassword(e.target.value)}></input>
          
          <hr/>

          <button type="submit">Log in</button>
      </form>    
   );
}

export default LoginForm
