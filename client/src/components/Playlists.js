import axios from 'axios'
import React, {useEffect, useContext} from 'react'
import { UserContext } from '../UserContext';
import { useHistory } from 'react-router';



function Playlists() {

    const history = useHistory()
    const {user, setUser} = useContext(UserContext);

    useEffect(() => {
        const getAllPlaylists = async() => {
            const result = await axios.get("http://localhost:3001/api/lists/" + user.username);  
            const playlists = await result.data;
            
            setUser({...user, Playlists: playlists});
        } 
        getAllPlaylists();
    }, []);


    return (
        <div>
            <p>My Playlists</p>

            <button onClick={() => {history.push("/newPlaylist")}}>New Playlist</button>

            <div className="playlists">
                {user.playLists.map((playlist) => {
                    return <div key={playlist.title}><p>{playlist.title}</p></div>
                })}
            </div>
        </div>
    )
}

export default Playlists