import React from "react";
import { useState } from "react";
import Axios from "axios";
import "../styling/FormStyle.css";
import { Link, useHistory } from "react-router-dom";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const createAccount = () => {
    Axios.post("http://localhost:3001/api/auth/register", {
      email: email,
      username: username,
      password: password,
    }).then(() => {
      console.log("success!");
      history.push("/");
    });
  };

  return (
    <div>
      <form className="form">
        <p>Email</p>
        <input
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        <p>Användarnamn</p>
        <input
          type="text"
          required
          onChange={(e) => setUsername(e.target.value)}
        ></input>

        <p>Password</p>
        <input
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        <hr />

        <button type="submit" onClick={createAccount}>
          Register
        </button>

        <Link to="/login">
          <p>Already registered? Go to Login.</p>
        </Link>
      </form>
    </div>
  );
}

export default RegisterForm;
