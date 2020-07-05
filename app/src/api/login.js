import { gql } from 'apollo-boost'

import client from './client'

const LOGIN = gql`
  mutation($input: LoginInput!) {
    login(input: $input)
  }
`

export default async ({ email, password }) => {
  // eslint-disable-next-line
  const { loading, error, data } = await client.mutate({
    mutation: LOGIN,
    variables: { input: { email, password } },
  })
  return data.login || ''
}
