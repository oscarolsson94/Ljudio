import LoginForm from "./components/LoginForm";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LoginForm}/>
      </Switch>
    </Router>
  );
}

export default App;
