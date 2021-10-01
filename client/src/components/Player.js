import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import YTPlayer from "yt-player";
import "../styling/PlayerStyle.css";
import Drawer from "@material-ui/core/Drawer";

function Player() {
  let { videoId } = useParams();

  const [listOpen, setListOpen] = useState(false);
  const [lists, setLists] = useState([]);

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

  useEffect(() => {
    /*     const getPlaylists = async () => {
      const { userLists } = await axios.get(`http://localhost:3001/api/lists/${user.name}`);
      setLists(userLists);
    }; */
  }, []);

  const handleAddToList = () => {
    /* axios.patch(`http://localhost:3001/api/lists/addto/${listTitle}`, {
      songURL: videoId,
    }); */
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
        <p onClick={handleAddToList}>List 1</p>
        <p>List 2</p>
        <p>List 3</p>
        <p>List 4</p>
        <p>List 5</p>
        <p>List 6</p>
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
