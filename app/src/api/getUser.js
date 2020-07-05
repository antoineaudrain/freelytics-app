import { gql } from 'apollo-boost'

import client from './client'

const GET_USER = gql`
  query {
    getUser {
      firstName
      lastName
    }
  }
`

export default async () => {
  // eslint-disable-next-line
  const { loading, error, data } = await client.query({
    query: GET_USER,
  })
  return data.getUser || undefined
}
