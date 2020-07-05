import {
  SET_TOKEN,
  LOGOUT,
  RESTORE_TOKEN,
  ADD_SESSIONS,
  SET_USER,
} from '../constants/user'

export const restoreToken = (token) => ({
  type: RESTORE_TOKEN,
  token,
})

export const setToken = (token) => ({
  type: SET_TOKEN,
  token,
})

export const setUser = (user) => ({
  type: SET_USER,
  user,
})

export const addSessions = (sessions) => ({
  type: ADD_SESSIONS,
  sessions,
})

export const logout = () => ({
  type: LOGOUT,
})
