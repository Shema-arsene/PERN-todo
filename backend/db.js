import { pool } from "pg"

export const pool = new Pool({
  user: "postgres",
  password: "Admin",
  host: "localhost",
  port: 5432,
  database: "PERN-todo",
})

export default pool
