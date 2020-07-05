import {connect} from '../database'
import {UserInputError} from 'apollo-server'

import {mapExercise, mapUser} from '../utils/map'

export const getUser = async (parent, args, {userId}, info) => {
  const db = await connect()
  const {rows} = await db.query(`
    SELECT *
    FROM users
    WHERE id = $1;
  `, [userId])
  if (!rows.length) {
    throw new UserInputError('UserId invalid', {
      invalidArgs: 'userId',
    })
  }
  return mapUser(rows[0])
}

export const getUserCurrExercises = async (parent, args, {userId}, info) => {
  const db = await connect()
  const {rows} = await db.query(`
        SELECT *
        FROM sessions
        WHERE ended_at > NOW() - INTERVAL '1 DAY'
        AND user_id = $1;
      `, [userId])
  return rows.map((session) => mapExercise(session))
}

export const getUserExercisesByName = async (parent, {exerciseName}, {userId}, info) => {
  const db = await connect()
  const {rows} = await db.query(`
        SELECT *
        FROM sessions
        WHERE workout_name = $1
        AND user_id = $2;
      `, [exerciseName.toLowerCase(), userId])
  return rows.map((session) => mapExercise(session))
}
