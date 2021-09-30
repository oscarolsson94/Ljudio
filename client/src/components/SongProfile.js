import React, {useState, useEffect} from 'react'
import YTPlayer from "yt-player";
import "../styling/SongProfileStyle.css"

function SongProfile() {

  const [duration, setDuration] = useState();
  const [progress, setProgress] = useState();
  const [playing, setPlaying] = useState(false);
  const [player, setPlayer] = useState();


  useEffect(() => {
    let ytPlayer = new YTPlayer("#ytPlayer")
    ytPlayer.load("5ys27BJXDD0");
    setPlayer(ytPlayer);   
  }, [])

  const playVideo = () => {
    setDuration(player.getDuration());
    player.play();
    setPlaying(true)
  }
  
  if(playing){
    setInterval(() => { 
      setProgress(player.getCurrentTime());
    }, 1000);
  }
  

  const pauseVideo = () => {
    player.pause();
    setPlaying(false);
  }

  return (
    <div>
      <div id="ytPlayer"></div>
      <progress value={progress} max={duration}/>
      <div>
      
        <button onClick={playVideo}>Play</button>
        <button onClick={pauseVideo}>Pause</button>
      </div>
    </div>
  )
}

export default SongProfile
