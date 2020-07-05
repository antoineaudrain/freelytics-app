import { ApolloServer } from 'apollo-server'
import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'

import resolvers from './resolvers'
import context from './utils/context'
import schemaDirectives from './directives'

const SCHEMA_DIRECTORY = join(__dirname, '..', 'schema')

const server = new ApolloServer({
  typeDefs: readdirSync(SCHEMA_DIRECTORY)
    .map(file => readFileSync(join(SCHEMA_DIRECTORY, file), 'utf8')),
  schemaDirectives,
  resolvers,
  context,
  playground: process.env.NODE_ENV === 'development',
  introspection: true,
})

export default server
