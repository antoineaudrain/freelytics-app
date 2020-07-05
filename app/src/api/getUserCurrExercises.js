import { gql } from 'apollo-boost'
import moment from 'moment'

import client from './client'

const GET_USER_CURR_EXERCISES = gql`
  query {
    getUserCurrExercises {
      id
      exerciseName
      startedAt
      endedAt
      qty
    }
  }
`

export default async () => {
  // eslint-disable-next-line
  const {loading, error, data} = await client.query({
    query: GET_USER_CURR_EXERCISES,
  })
  if (data && data.getUserCurrExercises) {
    return data.getUserCurrExercises.filter(
      ({ endedAt }) =>
        moment(+endedAt).format('MM-DD-YYYY') === moment().format('MM-DD-YYYY')
    )
  }
  return []
}
