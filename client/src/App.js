import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Player from "./components/Player";
import { UserContext } from "./UserContext";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {
      username: "",
      email: "",
      token: "",
      playLists: [],
    }
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Switch>
          <Route path="/" exact component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/song=:videoId" component={Player} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
