import axios from 'axios'
import React, { useEffect, useContext, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import { Redirect, useHistory } from 'react-router'
import DeleteIcon from '@mui/icons-material/Delete'
import { FaSearch } from 'react-icons/fa'
import AddBoxIcon from '@mui/icons-material/AddBox'
import '../styling/Playlists.css'

function Playlists() {
  const history = useHistory()
  const { user, setUser } = useContext(UserContext)
  const [usersLists, setUsersLists] = useState([])

  useEffect(() => {
    const getAllPlaylists = async () => {
      const result = await axios.get(
        'http://localhost:3001/api/lists/' + user.username,
      )
      setUsersLists(result.data)

      setUser({ ...user, playLists: result.data })
    }
    getAllPlaylists()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDelete = async (playlist) => {
    await axios.delete(`http://localhost:3001/api/lists/${playlist.title}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    })

    const newPlaylists = usersLists.filter(
      (list) => list.title !== playlist.title,
    )

    setUsersLists(newPlaylists)

    //removes from DB, still needs to update list state and
  }

  if (!user.token) return <Redirect to="/" />
  return (
    <div className="playlist-container">
          <div className="top-page">
            <FaSearch
              className="button-search"
              onClick={() => {
                history.push('/searchpage')
              }}
            /> 
            <h1>My Playlists</h1>

            <AddBoxIcon
              className="button"
              sx={{ fontSize: 30 }}
              onClick={() => {
                history.push('/newPlaylist')
              }}
            />
          </div>
        

        <div className="playlists">
          {usersLists?.map((playlist) => {
            return (
              <div className="container-single-list" key={playlist.title}>
                <p
                  onClick={() => {
                    history.push('/playlist=' + playlist.title)
                  }}
                >
                  {playlist.title}
                </p>
                <DeleteIcon
                  className="delete-icon"
                  sx={{ fontSize: 40 }}
                  onClick={() => handleDelete(playlist)}
                />
              </div>
            )
          })}
        </div>
      </div>
    
  )
}

export default Playlists
