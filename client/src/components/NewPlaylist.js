import React, {useState, useContext} from 'react'
import axios from 'axios'
import { UserContext } from '../UserContext';
function NewPlaylist() {

    const [title, setTitle] = useState("");
    const {user} = useContext(UserContext);

    const createPlayList = (e) => {
        e.preventDefault();
        console.log(user.token)
        axios.post("http://localhost:3001/api/lists/", {
            username: user.username,
            title : title
        },
        {
            headers: { Authorization: "Bearer " + user.token},
        })
        .then((result) => {
            console.log(result);
        })
    }

    return (
        <div>
            <p>Create a new Playlist</p>

            

            <form onSubmit={createPlayList}>
                <input type="text" onChange={e => setTitle(e.target.value)}></input>

                <button type="submit" value="Name of the playlist">Add playlist</button>
            </form>
        </div>
    )
}

export default NewPlaylist
