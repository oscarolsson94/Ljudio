import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import HomeButton from './HomeButton';

import "../css/SearchPage.css"

function SearchPage() {
    const [input, setInput] = useState('')
    const [songs, setSongs] = useState()

    //Consult the youtube api to search for songs 
    async function searchSong() {
        let response = await fetch('https://yt-music-api.herokuapp.com/api/yt/songs/' + input)
        let result = await response.json()
        setSongs(result.content)
        console.log(result.content)
      }

      //Creates a button with the search figure with the search function
      function SearchButton(){
        return (
            <button className="search-button" onClick={searchSong}>
                <FaSearch size={17} />
            </button>
           
        );
    };
    
    return (
        <>
            <div className="container-search-page" >
                <h3 className="title" >Tillgängliga låter/Artister</h3>
            </div>
            <div className="input-search">
                <input  className="input"
                    type="text" placeholder="Sök på låt eller artist"
                     onChange={e => setInput(e.target.value)}>
                </input>
                <SearchButton onClick={searchSong}></SearchButton>
            </div>
            <div> 
                <div>
                    {songs && songs.map(song => (
                     <div className="list-song" >{song.name}
                     </div>
                     ))}
                </div>
                <div className="home">
                     <HomeButton></HomeButton>
                 </div>
            </div> 
        </>
    )
}
export default SearchPage
