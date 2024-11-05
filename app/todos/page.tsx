"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Todo from "./components/to-do";

interface TodoItem {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

const TodosPage = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const user =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      const savedTodos = localStorage.getItem(`todos_${user}`);
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
    }
  }, [user, router]);

  useEffect(() => {
    if (user && todos.length > 0) {
      localStorage.setItem(`todos_${user}`, JSON.stringify(todos));
    }
  }, [todos, user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    const newTodo: TodoItem = {
      id: Date.now(),
      title,
      description,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setTitle("");
    setDescription("");
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (
    id: number,
    updatedTodo: { title: string; description?: string }
  ) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo))
    );
  };

  const handleToggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="max-w-xl mx-auto bg-white p-6 ">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-black">My Todos</h1>
          <button
            onClick={handleLogout}
            className="py-1 px-3 text-white bg-red-500  hover:bg-red-600 focus:outline-none"
          >
            Logout
          </button>
        </div>

        <form onSubmit={handleAddTodo} className="mb-4 space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 "
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 mt-1 border text-black  focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description (optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 mt-1 border text-black focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500  hover:bg-blue-600 "
          >
            Add Todo
          </button>
        </form>

        {/* Todo List */}
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li key={todo.id}>
              <Todo
                id={todo.id}
                title={todo.title}
                description={todo.description}
                completed={todo.completed}
                onDelete={handleDeleteTodo}
                onEdit={handleEditTodo}
                onToggleComplete={handleToggleComplete}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodosPage;
