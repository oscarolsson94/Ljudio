import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router";
import DeleteIcon from "@mui/icons-material/Delete";
import { FaSearch } from "react-icons/fa";

function Playlists() {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const { usersLists, setUsersLists } = useState([]);

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
  }, [usersLists]);

  const handleDelete = (playlist) => {
    axios.delete(`http://localhost:3001/api/lists/${playlist.title}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });

    const playlists = user.playLists.filter(
      (list) => list.title !== playlist.title
    );

    setUsersLists(playlists);

    //removes from DB, still needs to update list state and
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
              <p>
                {playlist.title}
                <DeleteIcon
                  className="delete"
                  fontSize="small"
                  onClick={() => handleDelete(playlist)}
                />
              </p>
            </div>
          );
        })}
      </div>
      <button>
        <FaSearch size={30} onClick={() => history.push("/searchpage")} />
      </button>
    </div>
  );
}

export default Playlists;
