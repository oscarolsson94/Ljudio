import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./css/SearchPage.css";
import SearchPage from "./components/SearchPage";
import PlayList from "./components/PlayList";
function App() {
  return (
    <Router>
      <div className="container-search-page">
      <Switch>
        <Route path="/search" exact component={SearchPage}/>
        <Route path="/playlist:/videoId" exact component={PlayList}/>
      </Switch>
      </div>
    </Router> 
  );
}
export default App;
