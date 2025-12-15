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

// Update a todo
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { description, completed } = req.body

    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1, completed = $2 WHERE todo_id = $3 RETURNING *",
      [description, completed, id]
    )
    if (updateTodo.rows.length === 0) {
      return res.status(404).json({ msg: "Todo not found" })
    }
    res.status(200).json({
      message: "Todo updated successfully",
      todo: updateTodo.rows[0],
    })
  } catch (error) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

// Delete a todo
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params
    await pool.query("DELETE FROM todo WHERE todo_id = $1 RETURNING *", [id])

    res.status(200).json("Todo deleted successfully!")
  } catch (error) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

export default router
