"use client";
import { ITodo } from "@/model/Todo";
import { useRouter } from "next/navigation";

interface TodoItemProps {
  todo: ITodo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const router = useRouter();


  const deleteTodo = async () => {
    try {
      await fetch(`/api/todos?id=${todo._id}`, {
        method: "DELETE",
      });
      router.refresh();
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  return (
    <li className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm">
      <div className="flex items-center space-x-3">
        <span
          className={`${
            todo.completed
              ? "line-through text-gray-400"
              : "text-gray-800"
          }`}
        >
          {todo.title}
        </span>
      </div>
      
      <button
        onClick={deleteTodo}
        className="text-red-500 hover:text-red-700 px-2 py-1 hover:bg-red-100 cursor-pointer transition-all duration-150 rounded text-sm font-medium"
      >
        Delete
      </button>
    </li>
  );
}