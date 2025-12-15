import { useState } from "react"
import axios from "axios"

const App = () => {
  const [description, setDescription] = useState("")
  const [todos, setTodos] = useState([])
  const [editTodo, setEditTodo] = useState(null)
  const [editedText, setEditedText] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    setDescription("")
    console.log("Todo added!")
  }

  return (
    <main className="min-h-screen w-full flex justify-center items-center bg-gray-900">
      <div className="bg-gray-50 rounded-xl shadow-xl p-8 w-full max-w-lg">
        <h1 className="text-3xl text-gray-900 font-bold">PERN - Todo App</h1>
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 border border-gray-300 rounded-md p-1 my-5"
        >
          <input
            type="text"
            id="todo-description"
            placeholder="Add a new todo"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="flex-1 px-1 text-gray-700 outline-none"
          />

          <button
            type="submit"
            className="font-medium bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md cursor-pointer whitespace-nowrap"
          >
            Add Todo
          </button>
        </form>
      </div>
    </main>
  )
}

export default App
