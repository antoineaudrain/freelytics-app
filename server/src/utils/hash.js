import crypto from 'crypto'

export const encrypt = (string, key) => crypto
  .createHmac('sha512', key)
  .update(string)
  .digest('hex')
