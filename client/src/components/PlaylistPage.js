import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Redirect, useParams } from "react-router";
import { PlayerContext } from "../contexts/PlayerContext";
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useHistory } from "react-router";
import { UserContext } from "../contexts/UserContext";
import DeleteIcon from "@mui/icons-material/Delete";
import "../styling/PlaylistPageStyle.css";

function PlaylistPage() {
  const { title } = useParams();
  const { queue, setQueue } = useContext(PlayerContext);
  const [playlist, setPlaylist] = useState([]);

  const { user } = useContext(UserContext);

  const history = useHistory();

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

  const handleDelete = async (song) => {
    await axios.patch(
      `http://localhost:3001/api/lists/removefrom/${title}`,
      {
        songId: song.songId,
      },
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    const newPlaylist = playlist.filter((tune) => tune.title !== song.title);
    setPlaylist(newPlaylist);
    setQueue({ ...queue, queueList: newPlaylist });
    //Need to update queue state.
  };

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

  if (!user.token) return <Redirect to="/" />;
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
        {playlist?.map((song, index) => (
          <div className="songBody" key={song._id}>
            <img
              src={song.coverPic}
              alt="album"
            />
            <div className="textContent">
              <p>{song.artist}</p>
              <p>{song.title}</p>
            </div>
            <div className="buttons">
              <PlayCircleFilledOutlinedIcon style={{height: 60, width: 60}} fontSize="large" onClick={() => {playSong(song, index)}}/>
              <DeleteIcon style={{height: 60, width: 60}}
                className="delete"
                fontSize="large"
                onClick={() => handleDelete(song)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlaylistPage;
