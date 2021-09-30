import React, {useState, useEffect} from 'react'
import YTPlayer from "yt-player";

function SongProfile() {

  const [duration, setDuration] = useState();
  const [progress, setProgress] = useState();
  const [playing, setPlaying] = useState();
  const [player, setPlayer] = useState();


  useEffect(() => {
    let ytPlayer = new YTPlayer("#ytPlayer")
    ytPlayer.load("5ys27BJXDD0");
    setPlayer(ytPlayer);   
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
