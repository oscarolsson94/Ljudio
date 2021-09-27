import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from "axios";
import "../styling/FormStyle.css"

function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        Axios.post("http://localhost:3001/api/auth/login", {
            email: email,
            password: password
        }).then(() => {
            console.log("Success!");
        })
        
    }
    
    return (
      <form className="form">
          <p>Email</p>
          <input type="email" required onChange={(e) => setEmail(e.target.value)}></input>

          <p>Password</p>
          <input type="password" required onChange={(e) => setPassword(e.target.value)}></input>
          
          <hr/>

          <button type="submit" onClick={login}>Log in</button>

          <Link to="/register"><p>Not registered? Click here.</p></Link>
      </form>    
   );
}

export default LoginForm
