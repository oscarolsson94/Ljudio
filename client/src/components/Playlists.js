import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router";
import DeleteIcon from "@mui/icons-material/Delete";
import { FaSearch } from "react-icons/fa";

function Playlists() {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [usersLists, setUsersLists] = useState([]);

  useEffect(() => {
    const getAllPlaylists = async () => {
      const result = await axios.get(
        "http://localhost:3001/api/lists/" + user.username
      );
      setUsersLists(result.data);

      setUser({ ...user, playLists: result.data });
    };
    getAllPlaylists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (playlist) => {
    axios.delete(`http://localhost:3001/api/lists/${playlist.title}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });

    const newPlaylists = usersLists.filter(
      (list) => list.title !== playlist.title
    );

    setUsersLists(newPlaylists);

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
        {usersLists?.map((playlist) => {
          return (
            <div key={playlist.title}>
              <p
                onClick={() => {
                  history.push("/playlist=" + playlist.title);
                }}
              >
                {playlist.title}
              </p>
              <DeleteIcon
                className="delete"
                fontSize="small"
                onClick={() => handleDelete(playlist)}
              />
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
