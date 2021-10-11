import axios from 'axios'
import React, { useEffect, useContext, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import { Redirect, useHistory } from 'react-router'
import DeleteIcon from '@mui/icons-material/Delete'
import '../styling/Playlists.css'
import AddBoxIcon from '@mui/icons-material/AddBox'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

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
    <div>
      <p className="title">Mina Spellistor</p>
      <hr className="hr-horizontal" />
      <div className="playlist">
        <div className="buttons">
          <div>
            <ArrowBackIosIcon
              className="button-back"
              sx={{ fontSize: 40 }}
              onClick={() => {
                history.push('/searchpage')
              }}
            ></ArrowBackIosIcon>
          </div>
          <div>
            <AddBoxIcon
              className="button"
              sx={{ fontSize: 40 }}
              onClick={() => {
                history.push('/newPlaylist')
              }}
            ></AddBoxIcon>
          </div>
        </div>
        <div>
          {usersLists?.map((playlist) => {
            return (
              <div className="container-playlist" key={playlist.title}>
                <p
                  onClick={() => {
                    history.push('/playlist=' + playlist.title)
                  }}
                >
                  {playlist.title}
                </p>
                <DeleteIcon
                  className="delete"
                  sx={{ fontSize: 40 }}
                  onClick={() => handleDelete(playlist)}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Playlists
