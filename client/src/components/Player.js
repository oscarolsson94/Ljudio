import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { Redirect } from "react-router";
import YTPlayer from "yt-player";
import "../styling/PlayerStyle.css";
import Drawer from "@material-ui/core/Drawer";
import Slider from "@material-ui/core/Slider";
import PauseCircleFilledOutlinedIcon from "@mui/icons-material/PauseCircleFilledOutlined";
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import HomeButton from "./HomeButton";
import { UserContext } from "../contexts/UserContext";
import { PlayerContext } from "../contexts/PlayerContext";

function Player() {
  let { videoId } = useParams();
  let history = useHistory();
  //Oscar
  const [listOpen, setListOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { queue, setQueue } = useContext(PlayerContext);
  //
  const [artist, setArtist] = useState();
  const [songName, setSongName] = useState();
  const [duration, setDuration] = useState();
  const [progress, setProgress] = useState(0);
  const [player, setPlayer] = useState();
  const [albumCover, setAlbumCover] = useState();
  const [intervalId, setIntervalId] = useState(0);
  const [playing, setPlaying] = useState(false);

  //-----------------------OnMount-----------------------

  //Setup the player
  useEffect(() => {
    const setupPlayer = () => {
      let ytPlayer = new YTPlayer("#ytPlayer");
      ytPlayer.load(videoId);
      setPlayer(ytPlayer);

      ytPlayer.on("unstarted", () => {
        setDuration(ytPlayer.getDuration());
        ytPlayer.play();
        const newIntervalId = setInterval(() => {
          setProgress(ytPlayer.getCurrentTime());
        }, 1000);
        setIntervalId(newIntervalId);
        setPlaying(true);
      });

      ytPlayer.on("ended", () => {
        //play the next song in the queue when the song has ended.
        if (queue.queueList.length > 1) {
          ytPlayer.destroy();
          setProgress(0);
          if (queue.queueIndex === queue.queueList.length - 1) {
            setQueue({ ...queue, queueIndex: 0 });
            history.push("/song=" + queue.queueList[0].songId);
          } else {
            setQueue({ ...queue, queueIndex: ++queue.queueIndex });
            history.push("/song=" + queue.queueList[queue.queueIndex].songId);
          }
        } else {
          ytPlayer.play();
        }
      });
    };
    setupPlayer();
    //Get the data of the current song such as the artists name etc.
    const getData = async () => {
      const response = await fetch(
        "https://yt-music-api.herokuapp.com/api/yt/song/" + videoId
      );
      let result = await response.json();
      setArtist(result.artist.name);
      setSongName(result.name);
      setAlbumCover(result.thumbnails[1].url);
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  //Oscar
  useEffect(() => {
    const getPlaylists = async () => {
      const { data } = await axios.get(
        `http://localhost:3001/api/lists/${user.username}`
      );
      setUser({ ...user, playLists: data });
    };
    getPlaylists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //-----------------------OnMount-----------------------

  //-----------------------cleanup-----------------------

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  const cleanUp = () => {
    player.destroy();
    stopCount();
    if (playing) {
      setPlaying(false);
    }
    setProgress(0);
  };

  //-----------------------cleanup-----------------------

  const handleAddToList = (title) => {
    axios.patch(
      `http://localhost:3001/api/lists/addto/${title}`,
      {
        songId: videoId,
        title: songName,
        artist,
        coverPic: albumCover,
      },
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    setListOpen(false);
  };

  //Functions related to changing the player such as playing the next song etc.
  const changeVideoProgress = async (event, newValue) => {
    pauseSong();
    setProgress(newValue);
    player.seek(progress);
  };

  const resetSong = () => {
    stopCount();
    setProgress(0);
    player.seek(0);
    playSong();
  };

  const playSong = () => {
    setDuration(player.getDuration());
    player.play();
    startCount();
    setPlaying(true);
  };

  const pauseSong = () => {
    player.pause();
    stopCount();
    setPlaying(false);
  };
  //___________________________________________

  //Functions related to the timer that the progress bar is dependant on
  const startCount = () => {
    const newIntervalId = setInterval(() => {
      setProgress(player.getCurrentTime());
    }, 1000);
    setIntervalId(newIntervalId);
  };

  const stopCount = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
      return;
    }
  };

  const playNextSong = () => {
    if (queue.queueIndex === queue.queueList.length - 1) {
      setQueue({ ...queue, queueIndex: 0 });
      history.push("/song=" + queue.queueList[0].songId);
    } else {
      setQueue({ ...queue, queueIndex: ++queue.queueIndex });
      history.push("/song=" + queue.queueList[queue.queueIndex].songId);
    }
    cleanUp();
  };

  const playPreviousSong = () => {
    if (queue.queueIndex === 0) {
      setQueue({ ...queue, queueIndex: queue.queueList.length - 1 });
      history.push(
        "/song=" + queue.queueList[queue.queueList.length - 1].songId
      );
    } else {
      setQueue({ ...queue, queueIndex: --queue.queueIndex });
      history.push("/song=" + queue.queueList[queue.queueIndex].songId);
    }
    cleanUp();
  };
  //___________________________________________

  const styles = {
    playbutton: {
      height: 60,
      width: 60,
    },
  };

  if (!user.token) return <Redirect to="/" />;
  return (
    <div className="body">
      <Drawer anchor="right" open={listOpen} onClose={() => setListOpen(false)}>
        {/* loop over the users playlists */}
        {user.playLists ? (
          <>
            <h2 className="title-add-playlist">
              What playlist would you like to add {songName} to?
            </h2>
            {user.playLists.map((list) => (
              <div
                className="container-playlists"
                key={list._id}
                value={list.title}
                onClick={() => handleAddToList(list.title)}
              >
                <p>{list.title}</p>
              </div>
            ))}
          </>
        ) : (
          <>
            <h2>You have not created any playlists yet</h2>
            <Link to="/newPlaylist">Would you like to create one?</Link>
          </>
        )}
      </Drawer>
      <img src={albumCover} alt="album cover"></img>
      <p>{artist}</p>
      <p>{songName}</p>
      <div id="ytPlayer"></div>
      <Slider
        style={{ width: "80%" }}
        value={progress}
        onChange={changeVideoProgress}
        onMouseUp={playSong}
        max={duration}
      />
      <div>
        <div className="buttons">
          <RestartAltIcon
            className="playerbutton"
            fontSize="large"
            onClick={resetSong}
            color="action"
          />
          {queue.queueList.length > 1 ? (
            <SkipPreviousIcon
              className="playerbutton"
              onClick={playPreviousSong}
              color="action"
              fontSize="large"
            />
          ) : null}
          {playing ? (
            <PauseCircleFilledOutlinedIcon
              className="playerbutton"
              color="action"
              style={styles.playbutton}
              onClick={pauseSong}
            />
          ) : (
            <PlayCircleFilledOutlinedIcon
              className="playerbutton"
              color="action"
              style={styles.playbutton}
              fontSize="large"
              onClick={playSong}
            />
          )}
          {queue.queueList.length > 1 ? (
            <SkipNextIcon
              className="playerbutton"
              onClick={playNextSong}
              color="action"
              fontSize="large"
            />
          ) : null}
          <AddBoxRoundedIcon
            className="playerbutton"
            color="action"
            onClick={() => setListOpen(true)}
            fontSize="large"
          />
        </div>
      </div>
      <div className="home">
        <HomeButton></HomeButton>
      </div>
    </div>
  );
}

export default Player;
