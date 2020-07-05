import AsyncStorage from '@react-native-community/async-storage'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { ApolloClient } from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { API_URL } from 'react-native-dotenv'

const httpLink = createHttpLink({
  uri: API_URL || 'http://localhost:3000',
})

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('userToken')
  console.log('client', token)
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
})

export default new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
