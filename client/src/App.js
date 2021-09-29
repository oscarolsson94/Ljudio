import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { useState, useEffect } from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {AuthContext} from "./AuthContext"

function App() {

  const [token, setToken] = useState(null);
  
  useEffect(() => {
      setToken(localStorage.getItem("myToken"));
  },[]);

  return (
    <Router>
      {token ? <Redirect to="/frontpage"/> : <Redirect to="/"/>}
      <Switch>
        <AuthContext.Provider value={{token, setToken}}>
          <Route path="/" exact component={LoginForm}/>
          <Route path="/register" component={RegisterForm}/>
          <Route path="/frontpage"/>
        </AuthContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;
