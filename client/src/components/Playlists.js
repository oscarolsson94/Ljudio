import axios from "axios";
import React, { useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router";
import DeleteIcon from "@mui/icons-material/Delete";

function Playlists() {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const getAllPlaylists = async () => {
      const result = await axios.get(
        "http://localhost:3001/api/lists/" + user.username
      );
      const playlists = result.data;

      setUser({ ...user, playLists: playlists });
    };
    getAllPlaylists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = () => {
    console.log("delete");
  };

  return (
    <div>
      <p>My Playlists</p>

      <button
        onClick={() => {
          history.push("/newPlaylist");
        }}
      >
        New Playlist
      </button>

      <div className="playlists">
        {user.playLists.map((playlist) => {
          return (
            <div
              onClick={() => {
                history.push("/playlist=" + playlist.title);
              }}
              key={playlist.title}
            >
              <p>{playlist.title}</p>
              <DeleteIcon onClick={handleDelete} color="primary" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Playlists;
