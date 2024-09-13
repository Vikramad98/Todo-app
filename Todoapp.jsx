import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Check, X, Plus } from 'lucide-react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [category, setCategory] = useState('personal');
  const [categories, setCategories] = useState(['personal', 'work', 'shopping']);
  const [newCategory, setNewCategory] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [editCategory, setEditCategory] = useState('');

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    const storedCategories = JSON.parse(localStorage.getItem('categories'));
    if (storedTodos) setTodos(storedTodos);
    if (storedCategories) setCategories(storedCategories);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [todos, categories]);

  const addTodo = () => {
    if (input.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: input, completed: false, category }]);
      setInput('');
    }
  };

  const addCategory = () => {
    if (newCategory.trim() !== '' && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEditing = (id, text, category) => {
    setEditingId(id);
    setEditText(text);
    setEditCategory(category);
  };

  const saveEdit = () => {
    setTodos(todos.map(todo =>
      todo.id === editingId ? { ...todo, text: editText, category: editCategory } : todo
    ));
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return todo.category === filter;
  });

  const getCategoryColor = (category) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-red-100 text-red-800',
      'bg-yellow-100 text-yellow-800',
      'bg-indigo-100 text-indigo-800',
      'bg-pink-100 text-pink-800',
    ];
    const index = categories.indexOf(category) % colors.length;
    return colors[index];
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Todo App</h1>
      
      <div className="mb-6">
        <div className="flex mb-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add a new todo"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 py-3 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out"
          >
            Add
          </button>
        </div>
        
        <div className="flex mb-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Create a new category"
          />
          <button
            onClick={addCategory}
            className="bg-green-500 text-white px-4 py-3 rounded-r-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 ease-in-out"
          >
            Add Category
          </button>
        </div>
        
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      
      <ul className="space-y-3">
        {filteredTodos.map(todo => (
          <li key={todo.id} className={`flex items-center p-3 rounded-lg transition duration-200 ease-in-out ${todo.completed ? 'bg-gray-100' : 'bg-white'} hover:shadow-md`}>
            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-grow p-2 mr-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="p-2 mr-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <button onClick={saveEdit} className="text-green-500 hover:text-green-700 p-1 rounded transition duration-200 ease-in-out">
                  <Check size={20} />
                </button>
                <button onClick={cancelEdit} className="text-red-500 hover:text-red-700 p-1 rounded transition duration-200 ease-in-out">
                  <X size={20} />
                </button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="mr-3 form-checkbox h-5 w-5 text-blue-500 rounded focus:ring-blue-500"
                />
                <span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  {todo.text}
                </span>
                <span className={`text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ${getCategoryColor(todo.category)}`}>
                  {todo.category}
                </span>
                <button
                  onClick={() => startEditing(todo.id, todo.text, todo.category)}
                  className="text-blue-500 hover:text-blue-700 p-1 rounded transition duration-200 ease-in-out"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700 p-1 rounded transition duration-200 ease-in-out"
                >
                  <Trash2 size={18} />
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
