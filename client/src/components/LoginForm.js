import React from "react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import "../styling/FormStyle.css";
import { useHistory } from "react-router-dom";
import { UserContext } from "../UserContext";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  const login = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/api/auth/login", {
      email: email,
      password: password,
    }).then((response) => {
      localStorage.setItem("myToken", response.data.accessToken);
      setUser({
        ...user,
        username: response.data.username,
        email: response.data.email,
        token: response.data.accessToken,
      });
      history.push("#"); //change to playlist page later
    });
  };

  return (
    <form className="form">
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

      <button type="submit" onClick={login}>
        Log in
      </button>

      <Link to="/register">
        <p>Not registered? Click here.</p>
      </Link>
    </form>
  );
}

export default LoginForm;
