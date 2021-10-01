import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthContext } from "./AuthContext";
import Player from "./components/Player";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("myToken"));
  }, [token]);

  return (
    <Router>
      <Switch>
        <AuthContext.Provider value={{ token, setToken }}>
          <Route path="/" exact component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/song=:videoId" component={Player} />
        </AuthContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;
