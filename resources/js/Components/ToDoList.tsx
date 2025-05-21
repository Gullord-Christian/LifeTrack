import { useState } from "react";

interface TodoItem {
    id: number;
    text: string;
    done: boolean;
}

export default function TodoList() {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [input, setInput] = useState("");

    const addTodo = () => {
        if (!input.trim()) return;

        const newTodo: TodoItem = {
            id: Date.now(),
            text: input.trim(),
            done: false,
        };

        setTodos([newTodo, ...todos]);
        setInput("");
    };

    const toggleDone = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, done: !todo.done } : todo
            )
        );
    };

    const removeTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <div className="p-4 bg-white shadow rounded max-w-md">
            <h2 className="text-lg font-semibold mb-2">To-Do List</h2>

            <div className="flex gap-2 mb-4">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addTodo()}
                    placeholder="Add a task..."
                    className="flex-1 border rounded px-2 py-1 text-sm"
                />
                <button
                    onClick={addTodo}
                    className="bg-lifeTrack-dark text-white px-3 py-1 rounded text-sm hover:bg-lifeTrack-primary"
                >
                    Add
                </button>
            </div>

            <ul className="space-y-1">
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        className="flex items-center justify-between group"
                    >
                        <span
                            onClick={() => toggleDone(todo.id)}
                            className={`cursor-pointer text-sm ${
                                todo.done
                                    ? "line-through text-gray-400"
                                    : "text-gray-800"
                            }`}
                        >
                            {todo.text}
                        </span>
                        <button
                            onClick={() => removeTodo(todo.id)}
                            className="text-red-500 text-xs opacity-0 group-hover:opacity-100"
                        >
                            ✕
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
