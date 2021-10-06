import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Player from "./components/Player";
import { UserContext } from "./contexts/UserContext";
import Playlists from "./components/Playlists";
import NewPlaylist from "./components/NewPlaylist";
import PlaylistPage from "./components/PlaylistPage";
import SearchPage from "./components/SearchPage";
import { PlayerContext } from "./contexts/PlayerContext";

function App() {
  const [queue, setQueue] = useState();
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
    <PlayerContext.Provider value={{queue, setQueue}}>
      <Router>
        <Switch>
          <Route path="/" exact component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/song=:videoId" component={Player} />
          <Route path="/searchpage" component={SearchPage} />
          <Route path="/playlists" component={Playlists} />
          <Route path="/newPlaylist" component={NewPlaylist} />
          <Route path="/playlist=:title" component={PlaylistPage} />
        </Switch>
      </Router>
    </PlayerContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
