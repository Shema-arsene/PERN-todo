import { useEffect, useState } from "react"
import axios from "axios"
import { MdModeEditOutline, MdOutlineDone } from "react-icons/md"
import { FaTrash } from "react-icons/fa"
import { IoCloseOutline } from "react-icons/io5"

const App = () => {
  const [description, setDescription] = useState("")
  const [todos, setTodos] = useState([])
  const [editingTodo, setEditingTodo] = useState(null)
  const [editedText, setEditedText] = useState("")
  const [error, setError] = useState("")

  const getTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/todos")
      setTodos(response.data)
      console.log(response.data)
    } catch (err) {
      console.error("Error adding todo:", err)
    }
  }

  useEffect(() => {
    getTodos()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!description.trim()) {
      setError("Todo cannot be empty")
      return
    }

    setError("")

    try {
      await axios.post("http://localhost:5000/todos", {
        description,
        completed: false,
      })
      setDescription("")
      getTodos()
    } catch (err) {
      console.error("Error adding todo:", err)
    }
  }

  const saveEditedTodo = async (todoId) => {
    try {
      await axios.put(`http://localhost:5000/todos/${todoId}`, {
        description: editedText,
      })
      setEditingTodo(null)
      setEditedText("")
      getTodos()
    } catch (err) {
      console.error("Error updating todo:", err)
    }
  }

  const deleteTodo = async (todoId) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${todoId}`)
      setTodos(todos.filter((todo) => todo.todo_id !== todoId))
      getTodos()
    } catch (err) {
      console.error("Error updating todo:", err)
    }
  }

  const toggleCompleted = async (todoId) => {
    try {
      const todo = todos.find((todo) => todo.todo_id === todoId)
      await axios.put(`http://localhost:5000/todos/${todoId}`, {
        description: todo.description,
        completed: !todo.completed,
      })
      setTodos(
        todos.map((todo) =>
          todo.todo_id === todoId
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      )
    } catch (err) {
      console.error("Error updating todo:", err)
    }
  }

  return (
    <main className="min-h-screen w-full flex justify-center items-center bg-gray-900">
      <div className="bg-gray-50 rounded-xl shadow-xl p-8 w-full max-w-lg">
        <h1 className="text-3xl text-gray-900 font-bold">PERN - Todo App</h1>
        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
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
        <section>
          {todos.length === 0 ? (
            <p className="text-lg text-gray-700">
              No tasks available. Add a new task!
            </p>
          ) : (
            <div className="p-4 flex flex-col gap-4">
              {todos.map((todo) => (
                <div key={todo.todo_id} className="bg-gray-50">
                  {editingTodo === todo.todo_id ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        setEditingTodo(null)
                        setEditedText("")
                      }}
                      className="flex items-center gap-3"
                    >
                      <input
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        className="flex-1 p-1.5 border border-gray-300 rounded-md text-gray-700 outline-none shadow-inner"
                      />
                      <button
                        onClick={() => saveEditedTodo(todo.todo_id)}
                        className="font-medium bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md cursor-pointer whitespace-nowrap"
                      >
                        <MdOutlineDone size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setEditingTodo(null)
                          setEditedText("")
                        }}
                        className="font-medium bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md cursor-pointer whitespace-nowrap"
                      >
                        <IoCloseOutline size={16} />
                      </button>
                    </form>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center justify-start gap-2 overflow-hidden">
                        <button
                          onClick={() => toggleCompleted(todo.todo_id)}
                          className={`h-6 w-6 rounded-full border border-gray-300 flex items-center justify-center shrink-0 cursor-pointer ${
                            todo.completed
                              ? "bg-green-500 border-green-500 text-white"
                              : "border-gray-300 hover:border-blue-400"
                          }`}
                        >
                          {todo.completed && <MdOutlineDone size={16} />}
                        </button>
                        <p>{todo.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingTodo(todo.todo_id),
                              setEditedText(todo.description)
                          }}
                          className="p-1.5 text-blue-500 hover:text-blue-700 rounded-full bg-blue-50 hover:bg-blue-100 duration-200 cursor-pointer"
                        >
                          <MdModeEditOutline />
                        </button>
                        <button
                          onClick={() => deleteTodo(todo.todo_id)}
                          className="p-1.5 text-red-500 hover:text-red-700 rounded-full bg-red-50 hover:bg-red-100 duration-200 cursor-pointer"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
