import React from "react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import "../styling/FormStyle.css";
import { Redirect } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);

  const login = (e) => {
    e.preventDefault()
    Axios.post("http://localhost:3001/api/auth/login", {
      email: email,
      password: password,
    }).then((response) => {
      setUser({
        ...user,
        username: response.data.username,
        email: response.data.email,
        token: response.data.accessToken,
      });
    });
  };

  if (user.token) return <Redirect to="/searchpage" />;
  return (
    <form className="loginForm" onSubmit={login}>
      <p>Email</p>
      <input
        type="email"
        required
        onChange={(e) => setEmail(e.target.value)}
      ></input>

      <p>Password</p>
      <input
        type="password"
        required
        onChange={(e) => setPassword(e.target.value)}
      ></input>

      <hr />

      <button type="submit">
        Log in
      </button>

      <Link to="/register">
        <p>Not registered? Click here.</p>
      </Link>
    </form>
  );
}

export default LoginForm;
