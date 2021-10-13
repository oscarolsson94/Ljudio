import React, { useState, useContext, useEffect } from 'react'
import { PlayerContext } from '../contexts/PlayerContext'
import { FaSearch } from 'react-icons/fa'
import HomeButton from './HomeButton'
import '../styling/SearchPage.css'
import { Redirect, useHistory } from 'react-router'
import { UserContext } from '../contexts/UserContext'

function SearchPage() {
  const [input, setInput] = useState('')
  const [songs, setSongs] = useState()
  const history = useHistory()

  const { user } = useContext(UserContext)

  const { setQueue } = useContext(PlayerContext)

  useEffect(() => {
    setQueue({
      queueList: [],
      queueIndex: 0,
    })
  }, [setQueue])

  //Consult the youtube api to search for songs
  async function searchSong() {
    let response = await fetch(
      'https://yt-music-api.herokuapp.com/api/yt/songs/' + input,
    )
    let result = await response.json()
    setSongs(result.content)
  }
  //Creates a button with the search figure with the search function
  function SearchButton() {
    return (
      <button
        className="search-button"
        onClick={() => {
          searchSong()
        }}
      >
        <FaSearch size={17} />
      </button>
    )
  }
  if (!user.token) return <Redirect to="/" />
  return (
    <>
      <div className="container-search-page">
        <h3 className="title">Available Songs/ Artists</h3>

        <div className="input-search">
          <input
            className="input"
            type="text"
            placeholder="Search for a song or artist"
            onChange={(e) => setInput(e.target.value)}
          ></input>

          <SearchButton
            onClick={() => {
              searchSong()
            }}
          ></SearchButton>
        </div>
        <div>
          {songs &&
            songs.map((song) => (
              <div
                className="list-song"
                onClick={() => history.push('/song=' + song.videoId)}
                key={song.videoId}
              >
                <div>
                  <img
                    className="image"
                    src={song.thumbnails[1].url}
                    alt="images"
                  />
                </div>
                <div>
                  <h2>{song.artist.name}</h2>
                  <h2 className="song-name">{song.name}</h2>
                </div>
              </div>
            ))}
          <div className="home">
            <HomeButton></HomeButton>
          </div>
        </div>
      </div>
    </>
  )
}
export default SearchPage
