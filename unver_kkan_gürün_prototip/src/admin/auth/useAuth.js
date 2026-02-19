import { useState, useCallback } from 'react'
import { db } from '../store/db.js'

export function useAuth() {
  const [authed, setAuthed] = useState(() => !!db.auth.getToken())

  const login = useCallback((username, password) => {
    if (username === 'admin' && password === db.auth.getPassword()) {
      db.auth.setToken({ token: 'fake-token-' + Date.now(), at: Date.now() })
      setAuthed(true)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    db.auth.clearToken()
    setAuthed(false)
  }, [])

  const changePassword = useCallback((currentPass, newPass) => {
    if (currentPass !== db.auth.getPassword()) return false
    db.auth.setPassword(newPass)
    return true
  }, [])

  return { authed, login, logout, changePassword }
}
