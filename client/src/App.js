import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LoginForm}/>
        <Route path="/register" component={RegisterForm}/>
      </Switch>
    </Router>
  );
}

export default App;
