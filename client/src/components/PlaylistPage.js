import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { PlayerContext } from "../contexts/PlayerContext";
import { useHistory } from "react-router";

function PlaylistPage() {
  const { title } = useParams();
  const { queue, setQueue } = useContext(PlayerContext)
  const [playlist, setPlaylist] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const getAllPlaylists = async () => {
      const result = await axios.get(
        "http://localhost:3001/api/lists/single/" + title
      );
      setPlaylist(result.data.content);
      setQueue({...queue, queueList: result.data.content});
    };
    getAllPlaylists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const playPlaylist = () => {
    history.push("/song=" + playlist[0].songId);
  }

  return (
    <div>
      <button onClick={playPlaylist}>Playlist player</button>
      <h1>{title}</h1>
      {playlist.map((song) => (
        <div key={song._id} onClick={() => {history.push("/song=" + song.songId)}}>
          <p>
            <img src={song.coverPic} alt="album" /> |{song.title} |{" "}
            {song.artist}
          </p>
        </div>
      ))}
    </div>
  );
  

}

export default PlaylistPage;
