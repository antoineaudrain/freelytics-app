import {AuthenticationError, ApolloError} from 'apollo-server'
import { v4 as uuidv4 } from 'uuid'

import {connect} from '../database'
import {encrypt} from '../utils/hash'
import {createToken} from '../utils/token'
import {mapExercise, mapUser} from '../utils/map'

export const createUser = async (parent, {input: {firstName, lastName, email, password}}, context, info) => {
  const db = await connect()
  const userId = uuidv4()
  const passwordKey = uuidv4()
  await db.query(`
    INSERT INTO users (id, first_name, last_name, email, password, password_key)
    VALUES ($1, $2, $3, $4, $5, $6);
  `, [userId, firstName, lastName, email, encrypt(password, passwordKey), passwordKey])

  const {rows} = await db.query(`
    SELECT *
    FROM users
    WHERE id = $1;
  `, [userId])
  if (!rows.length) {
    new ApolloError('User could not be created');
  }
  return mapUser(rows[0])
}

export const login = async (parent, {input: {email, password}}, context, info) => {
  const db = await connect()
  const {rows: sameEmailAccounts} = await db.query(`
    SELECT password_key
    FROM users
    WHERE email = $1;
  `, [email])

  if (sameEmailAccounts[0]) {
    const {password_key: passwordKey} = sameEmailAccounts[0]

    const {rows: authUser} = await db.query(`
        SELECT *
        FROM users
        WHERE email = $1
        AND password = $2;
      `, [email, encrypt(password, passwordKey)])
    if (authUser[0]) {
      return createToken(authUser[0].id)
    }
    return new AuthenticationError('Wrong password')
  }
  return new AuthenticationError('No account linked to this email address')
}

export const addExercise = async (parent, {input: {exerciseName, startedAt, endedAt, qty}}, {userId}, info) => {
  const db = await connect()
  const sessionId = uuidv4()
  await db.query(`
    INSERT INTO sessions (id, workout_name, user_id, started_at, ended_at, qty)
    VALUES ($1, $2, $3, $4, $5, $6);
  `, [sessionId, exerciseName.toLowerCase(), userId, new Date(+startedAt), new Date(+endedAt), qty])

  const {rows} = await db.query(`
    SELECT *
    FROM sessions
    WHERE id = $1;
  `, [sessionId])
  return mapExercise(rows[0])
}
