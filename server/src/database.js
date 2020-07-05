import { Client } from 'pg';

const client = new Client({
  host: process.env.POSTGRESQL_ADDON_HOST || "localhost",
  database: process.env.POSTGRESQL_ADDON_DB || "freelytics",
  user: process.env.POSTGRESQL_ADDON_USER || "freelytics",
  password: process.env.POSTGRESQL_ADDON_PASSWORD || "freelytics",
  port: process.env.POSTGRESQL_ADDON_PORT || 5432,
})

const conn = client.connect()

export const connect = async () => {
  await conn
  return client
}
