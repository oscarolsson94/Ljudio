import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { PlayerContext } from "../contexts/PlayerContext";
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useHistory } from "react-router";
import DeleteIcon from "@mui/icons-material/Delete";
import "../styling/PlaylistPageStyle.css";

function PlaylistPage() {
  const { title } = useParams();
  const { queue, setQueue } = useContext(PlayerContext);
  const [playlist, setPlaylist] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const getAllPlaylists = async () => {
      const result = await axios.get(
        "http://localhost:3001/api/lists/single/" + title
      );
      setPlaylist(result.data.content);
      setQueue({ ...queue, queueList: result.data.content });
    };
    getAllPlaylists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playPlaylist = () => {
    history.push("/song=" + playlist[0].songId);
  };

  const playSong = (song, index) => {
    history.push("/song=" + song.songId);
    setQueue({ ...queue, queueIndex: index });
    console.log(queue.queueIndex);
  };

  const goBack = () => {
    history.push("/playlists");
  };

  const handleDelete = () => {
    console.log("delete");
  };

  return (
    <div className="site">
      <div className="header">
        <ArrowBackIosNewOutlinedIcon onClick={goBack} fontSize="large" />
        <h1>{title}</h1>
        <PlayCircleFilledOutlinedIcon
          color="action"
          fontSize="large"
          onClick={playPlaylist}
        />
      </div>

      <div className="listContent">
        {playlist.map((song, index) => (
          <div
            className="songBody"
            key={song._id}
            onClick={() => {
              playSong(song, index);
            }}
          >
            <img src={song.coverPic} alt="album" />
            <div className="textContent">
              <p>{song.artist}</p>
              <p>{song.title}</p>
            </div>
            <DeleteIcon onClick={handleDelete} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlaylistPage;
