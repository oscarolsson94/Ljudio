import React, { useState, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../contexts/UserContext'
import { Redirect, useHistory } from 'react-router'
import '../styling/NewPlaylist.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
function NewPlaylist() {
  const [title, setTitle] = useState('')
  const { user } = useContext(UserContext)
  const history = useHistory()

  const createPlayList = (e) => {
    e.preventDefault()
    axios
      .post(
        'http://localhost:3001/api/lists/',
        {
          username: user.username,
          title: title,
        },
        {
          headers: { Authorization: 'Bearer ' + user.token },
        },
      )
      .then(() => {
        history.push('/playlists')
      })
  }

  if (!user.token) return <Redirect to="/" />
  return (
    <div>
      <p className="title">Create a new Playlist</p>
      <ArrowBackIosIcon
        className="button-back"
        sx={{ fontSize: 35 }}
        onClick={() => {
          history.push('/playlists')
        }}
      ></ArrowBackIosIcon>
      
      <form onSubmit={createPlayList}>
      <div className="form">
        <input type="text" className="input"
         placeholder="Name of new playlist"
        onChange={(e) => setTitle(e.target.value)}></input>

        <button type="submit" className="button-add" value="Name of the playlist">
        Add playlist
        </button>
        </div>
      </form>
    </div>
  )
}

export default NewPlaylist
