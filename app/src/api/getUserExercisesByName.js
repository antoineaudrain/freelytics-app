import { gql } from 'apollo-boost'

import client from './client'

const GET_USER_EXERCISES_BY_NAME = gql`
  query($exerciseName: ExerciseName!) {
    getUserExercisesByName(exerciseName: $exerciseName) {
      id
      exerciseName
      startedAt
      endedAt
      qty
    }
  }
`

export default async (exerciseName) => {
  // eslint-disable-next-line
  const {loading, error, data} = await client.query({
    query: GET_USER_EXERCISES_BY_NAME,
    variables: { exerciseName },
  })
  return (data && data.getUserExercisesByName) || []
}
