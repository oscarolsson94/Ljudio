import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

const LogoutButton = () => {
  const { setUser } = useContext(UserContext)

  const handleLogout = () => {
    setUser({
      username: '',
      email: '',
      token: '',
      playLists: [],
    })
  }
  return (
    <button className="logout" onClick={handleLogout}>
      Logout
    </button>
  )
}

export default LogoutButton
