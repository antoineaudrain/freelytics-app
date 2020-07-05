import {
  SET_TOKEN,
  RESTORE_TOKEN,
  LOGOUT,
  ADD_SESSIONS,
  SET_USER,
} from '../constants/user'

const initialState = {
  token: null,
  firstName: null,
  lastName: null,
  sessions: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case RESTORE_TOKEN:
      return {
        ...state,
        token: action.token,
      }
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      }
    case SET_USER:
      return {
        ...state,
        firstName: action.user.firstName,
        lastName: action.user.lastName,
      }
    case LOGOUT:
      return initialState
    case ADD_SESSIONS:
      return {
        ...state,
        sessions: [
          ...state.sessions.filter(
            ({ id: id1 }) => !action.sessions.find(({ id: id2 }) => id1 === id2)
          ),
          ...action.sessions,
        ],
      }
    default:
      return state
  }
}
