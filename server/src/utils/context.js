import {getDecodedToken} from "./token";

export default async ({ req }) => {
  const authorization = req.headers.authorization || ''

  if (authorization) {
    const token = authorization.split(' ')[1]
    const {userId} = await getDecodedToken(token)

    if (userId) {
      return {userId}
    }
  }
}
