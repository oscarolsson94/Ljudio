import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import YTPlayer from "yt-player";
import "../styling/PlayerStyle.css";
import Drawer from "@material-ui/core/Drawer";
import Slider from "@material-ui/core/Slider";
import PauseCircleFilledOutlinedIcon from '@mui/icons-material/PauseCircleFilledOutlined';
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { UserContext } from "../UserContext";

function Player() {
  let { videoId } = useParams();

  //Oscar
  const [listOpen, setListOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  //

  const [artist, setArtist] = useState();
  const [songName, setSongName] = useState();
  const [duration, setDuration] = useState();
  const [progress, setProgress] = useState(0);
  const [player, setPlayer] = useState();
  const [albumCover, setAlbumCover] = useState();
  const [intervalId, setIntervalId] = useState(0);
  const [playing, setPlaying] = useState(false); 

  useEffect(() => {
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

    let ytPlayer = new YTPlayer("#ytPlayer");
    ytPlayer.load(videoId);
    setPlayer(ytPlayer);

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

  const handleAddToList = (title) => {
    axios.patch(
      `http://localhost:3001/api/lists/addto/${title}`,
      {
        songURL: videoId,
      },
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    setListOpen(false);
  };
  //

  

  const changeVideoProgress = async (event) => {
    pauseSong();
    let newProgressValue = await event.target.value;
    setProgress(newProgressValue);
    player.seek(progress);
  };
  

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

  const resetSong = () => {
    stopCount();
    setProgress(0);
    player.seek(0);
    playSong();
  }

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

  const styles = {
    playbutton: {
      height: 60,
      width: 60,
    }

  }

  return (
    <div className="body">
      <Drawer anchor="right" open={listOpen} onClose={() => setListOpen(false)}>
        {/* loop over the users playlists */}
        {user.playLists ? (
          <>
            <h2>What playlist would you like to add {songName} to?</h2>
            {user.playLists.map((list) => (
              <div
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
      <Slider style={{width: 400}} value={progress} onChange={changeVideoProgress} onMouseUp={playSong} max={duration}/>
      <div>
        <div className="buttons">
        <RestartAltIcon color="action" onClick={resetSong} fontSize="large" />
        {playing ? <PauseCircleFilledOutlinedIcon color="action" style={styles.playbutton} onClick={pauseSong}/> : <PlayCircleFilledOutlinedIcon color="action" style={styles.playbutton} fontSize="large" onClick={playSong}/>}
        <AddBoxRoundedIcon color="action" onClick={() => setListOpen(true)} fontSize="large"/>
        </div>
        
      </div>
    </div>
  );
}

export default Player;
