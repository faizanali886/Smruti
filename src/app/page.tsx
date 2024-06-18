'use client'

import { useState } from 'react';
import { v4 as uuid } from 'uuid';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 'e3750240-3653-4077-b692-7559a95f35e5', text: 'Be productive', completed: false },
    { id: '782ab653-f30f-4b35-b65f-1040ae333889', text: 'Learn Docker', completed: true },
    { id: '61a1e887-2c8d-425e-ac39-3d1e4f27fa1d', text: 'Learn Cloud Run', completed: false }
  ]);
  const [newTodoText, setNewTodoText] = useState('');

  const toggleTodo = (id: string) => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const addTodo = (text: string) => {
    setTodos([...todos, { id: uuid(), text, completed: false }]);
  };

  const handleAddTodo = () => {
    if (newTodoText.trim() !== '') {
      addTodo(newTodoText);
      setNewTodoText('');
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-center my-6">Todo List</h1>
      <div className="flex flex-col items-center">
        <div className="mb-10">
          <input
            type="text"
            className="p-2 border rounded-md"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="Add new todo..."
          />
          <button
            className="ml-2 p-2 bg-blue-500 text-white rounded-md"
            onClick={handleAddTodo}>
            Add Todo
          </button>
        </div>
        <ul className="space-y-4">
          {todos.map(todo => (
            <li key={todo.id}
                className={`cursor-pointer p-4 rounded-lg shadow-md text-center ${todo.completed ? 'text-gray-500 line-through' : 'text-black'}`}
                onClick={() => toggleTodo(todo.id)}>
              {todo.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
