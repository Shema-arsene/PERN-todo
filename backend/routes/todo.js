import { Router } from "express"
import pool from "../db.js"

const router = Router()

// Create a new todo
router.post("/", async (req, res) => {
  const { description, completed } = req.body

  try {
    const newTodo = await pool.query(
      "INSERT INTO todo (description, completed) VALUES ($1, $2) RETURNING *",
      [description, completed || false]
    )
    res.json(newTodo.rows[0])
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

// Get all todos
router.get("/", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo")
    res.json(allTodos.rows)
  } catch (error) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

export default router
