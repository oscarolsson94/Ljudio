import React, {useState, useEffect} from 'react'
import YTPlayer from "yt-player";
import "../styling/SongProfileStyle.css"

function SongProfile() {

  const [artist, setArtist] = useState();
  const [songName, setSongName] = useState();
  const [duration, setDuration] = useState();
  const [progress, setProgress] = useState();
  const [playing, setPlaying] = useState(false);
  const [player, setPlayer] = useState();

  let videoId = "n812rfvvteo";

  useEffect(() => {
    let ytPlayer = new YTPlayer("#ytPlayer")
    ytPlayer.load(videoId);
    setPlayer(ytPlayer);   
    getData();
  }, []);
  
  const getData = async() => {
    const response = await fetch("https://yt-music-api.herokuapp.com/api/yt/song/" + videoId)
    let result = await response.json();
    console.log(result);
    setArtist(result.artist.name);
    setSongName(result.name);
  }

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
    <div className="body">
      <p>{artist}</p>
      <p>{songName}</p>
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
