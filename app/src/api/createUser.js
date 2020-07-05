import { gql } from 'apollo-boost'

import client from './client'

const CREATE_USER = gql`
  mutation($input: CreateUserInput!) {
    createUser(input: $input) {
      firstName
      lastName
    }
  }
`

export default async ({ firstName, lastName, email, password }) => {
  // eslint-disable-next-line
  const { loading, error, data } = await client.mutate({
    mutation: CREATE_USER,
    variables: { input: { firstName, lastName, email, password } },
  })
  return data
}
