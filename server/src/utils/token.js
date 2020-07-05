import jwt from 'jsonwebtoken'

export const createToken = userId => {
  return jwt.sign({userId}, process.env.JWT_SECRET)
}

export const getDecodedToken = token => {
  return jwt.verify(token, process.env.JWT_SECRET)
}
