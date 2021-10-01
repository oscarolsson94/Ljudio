import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import YTPlayer from "yt-player";
import "../styling/PlayerStyle.css";
import Drawer from "@material-ui/core/Drawer";
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

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://yt-music-api.herokuapp.com/api/yt/song/" + videoId
      );
      let result = await response.json();
      console.log(result);
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
      const { userLists } = await axios.get(
        `http://localhost:3001/api/lists/${user.username}`
      );
      setUser({ ...user, playLists: userLists });
    };
    getPlaylists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddToList = (e) => {
    e.preventDefault();
    axios.patch(`http://localhost:3001/api/lists/addto/${e.target.value}`, {
      songURL: videoId,
    });
  };

  const playVideo = () => {
    setDuration(player.getDuration());
    player.play();
    startCount();
  };

  const pauseVideo = () => {
    player.pause();
    stopCount();
  };

  const changeVideoProgress = async (event) => {
    pauseVideo();
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
  return (
    <div className="body">
      <Drawer anchor="right" open={listOpen} onClose={() => setListOpen(false)}>
        {/* loop over the users playlists */}
        {user.playLists?.map((list) => (
          <div
            key={list.listURL}
            value={list.title}
            onClick={() => handleAddToList}
          >
            {list.title}
          </div>
        ))}
      </Drawer>
      <img src={albumCover} alt="album cover"></img>
      <p>{artist}</p>
      <p>{songName}</p>
      <div id="ytPlayer"></div>
      <input
        className="progressBar"
        type="range"
        value={progress}
        onChange={changeVideoProgress}
        onMouseUp={playVideo}
        max={duration}
      />
      <div>
        <button onClick={playVideo}>Play</button>
        <button onClick={pauseVideo}>Pause</button>
      </div>
      <div>
        <button onClick={() => setListOpen(true)}>Add to my list</button>
      </div>
    </div>
  );
}

export default Player;
