import { AuthenticationError, ForbiddenError, SchemaDirectiveVisitor } from 'apollo-server';
import { defaultFieldResolver } from 'graphql';

import {connect} from './database'

const getUserById = async (userId) => {
  const db = await connect()
  const {rows} = await db.query(`
    SELECT id
    FROM users
    WHERE id = $1;
  `, [userId])
  return !!rows.length
}

class AuthenticationDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const originalResolve = field.resolve || defaultFieldResolver;

    field.resolve = async (...args) => {
      const context = args[2];
      const isAuthenticated = await getUserById(context.userId)

      if (!isAuthenticated) {
        throw new AuthenticationError('Not Authenticated');
      }

      return originalResolve.apply(this, args);
    }
  }
}

class AuthorizationDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    // const requiredRole = this.args.requires;
    const originalResolve = field.resolve || defaultFieldResolver;

    field.resolve = async (...args) => {
      // const context = args[2];
      // const isAuthenticated = await getUserById(context.userId)
      const isAuthorized = true;

      if (!isAuthorized) {
        throw new ForbiddenError('Not Authorized');
      }

      return originalResolve.apply(this, args);
    }
  }
}

export default {
  isAuthenticated: AuthenticationDirective,
  isAuthorized: AuthorizationDirective
}
