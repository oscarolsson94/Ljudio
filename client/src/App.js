import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./css/SearchPage.css";
import SearchPage from "./components/SearchPage";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/search" exact component={SearchPage}/>
      </Switch>
    </Router>
  );
}

export default App;
