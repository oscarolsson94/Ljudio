import React, {useState, useEffect} from 'react'
import YTPlayer from "yt-player";

function SongProfile() {

  let player;

  useEffect(() => {
    player = new YTPlayer("#ytPlayer")

    player.load("5ys27BJXDD0");
  }, [])

  const playVideo = () => {
    player.play();
  }

  const pauseVideo = () => {
    player.pause();
  }

  return (
    <div>
      <div id="ytPlayer"></div>
      <div>
      
        <button onClick={playVideo}>Play</button>
        <button onClick={pauseVideo}>Pause</button>
      </div>
    </div>
  )
}

export default SongProfile
