import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import HomeButton from './HomeButton'
import '../css/SearchPage.css'
function SearchPage() {
  const [input, setInput] = useState('')
  const [songs, setSongs] = useState()
  const [images, setImages] = useState()
  //Consult the youtube api to search for songs
  async function searchSong() {
    let response = await fetch(
      'https://yt-music-api.herokuapp.com/api/yt/songs/' + input,
    )
    let result = await response.json()
    setSongs(result.content)
  }
  async function searchImage() {
    let response = await fetch(
      'https://yt-music-api.herokuapp.com/api/yt/songs/' + input,
    )
    let result = await response.json()
    for (let i = 0; i < result.content.length; i++) {
      let res = result.content[i]
      setImages(res.thumbnails[0].url)
    }
  }
  //Creates a button with the search figure with the search function
  function SearchButton() {
    return (
      <button
        className="search-button"
        onClick={() => {
          searchSong()
          searchImage()
        }}
      >
        <FaSearch size={17} />
      </button>
    )
  }
  return (
    <>
      <div className="container-search-page">
        <h3 className="title">Tillgängliga låter/Artister</h3>
      </div>
      <div className="input-search">
        <input
          className="input"
          type="text"
          placeholder="Sök på låt eller artist"
          onChange={(e) => setInput(e.target.value)}
        ></input>

        <SearchButton
          onClick={() => {
            searchSong()
            searchImage()
          }}
        ></SearchButton>
      </div>
      <div>
        {songs &&
          songs.map((song) => (
            <div className="list-song">
              <div>
                <img
                  className="image"
                  src={song.thumbnails[1].url}
                  alt="images"
                />
              </div>
              <div>
                  <h2>{input}</h2>
                <h2 className="song-name">{song.name}</h2>
              </div>
            </div>
          ))}
      </div>

      <div className="home">
        <HomeButton></HomeButton>
      </div>
    </>
  )
}
export default SearchPage
