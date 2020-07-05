import { gql } from 'apollo-boost'

import client from './client'

const ADD_EXERCISE = gql`
  mutation($input: CreateExerciseInput!) {
    addExercise(input: $input) {
      id
      exerciseName
      startedAt
      endedAt
      qty
    }
  }
`

export default async ({ exerciseName, startedAt, endedAt, qty }) => {
  // eslint-disable-next-line
  const { loading, error, data } = await client.mutate({
    mutation: ADD_EXERCISE,
    variables: { input: { exerciseName, startedAt, endedAt, qty } },
  })
  if (data && data.addExercise) {
    return data.addExercise
  }
  return []
}
