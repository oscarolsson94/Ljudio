import { useHistory } from "react-router-dom";
import { BsHouseFill } from "react-icons/bs";

//Create home button, direct to playlist page with history

function HomeButton(){
    let history = useHistory();

    function handleClick() {
        history.push("/playlists");
      }
      return (
        <BsHouseFill type="button" className="home-button" onClick={handleClick}></BsHouseFill>
      );
}

export default HomeButton