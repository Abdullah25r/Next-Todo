"use client";
import { ITodo } from "@/model/Todo";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TodoItemProps {
  todo: ITodo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteProgress, setDeleteProgress] = useState(0);

  const deleteTodo = async () => {
    if (isDeleting) return;
    
    setIsDeleting(true);
    
    // Simulate progress for better UX
    const progressInterval = setInterval(() => {
      setDeleteProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 100);

    try {
      // Wait for 1.5 seconds to show the animation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      await fetch(`/api/todos?id=${todo._id}`, {
        method: "DELETE",
      });
      
      setDeleteProgress(100);
      await new Promise(resolve => setTimeout(resolve, 200));
      
      router.refresh();
    } catch (error) {
      console.error("Failed to delete todo:", error);
      setIsDeleting(false);
      setDeleteProgress(0);
      clearInterval(progressInterval);
    }
  };

  return (
    <li className={`
      relative flex items-center justify-between p-4 border rounded-lg shadow-sm transition-all duration-300
      ${isDeleting 
        ? 'bg-red-50 border-red-200' 
        : 'bg-white border-gray-200 hover:shadow-md'
      }
    `}>
      {/* Progress Bar Overlay */}
      {isDeleting && (
        <div 
          className="absolute top-0 left-0 h-full bg-red-100 transition-all duration-300 ease-out rounded-lg"
          style={{ width: `${deleteProgress}%` }}
        />
      )}
      
      <div className="flex items-center space-x-3 flex-1 relative z-10">
        <span className={`
          transition-all duration-300
          ${isDeleting 
            ? 'text-red-600 font-medium' 
            : todo.completed 
              ? 'line-through text-gray-400' 
              : 'text-gray-800'
          }
        `}>
          {todo.title}
        </span>
        
        {isDeleting && (
          <span className="text-red-500 text-sm">
            {deleteProgress < 100 ? 'Deleting...' : 'Deleted!'}
          </span>
        )}
      </div>
      
      <button
        onClick={deleteTodo}
        disabled={isDeleting}
        className={`
          relative z-10 px-3 py-2 rounded text-sm font-medium transition-all duration-300
          ${isDeleting
            ? 'bg-red-500 text-white cursor-not-allowed'
            : 'text-red-500 hover:text-white hover:bg-red-500 cursor-pointer border border-red-300'
          }
        `}
      >
        {isDeleting ? (
          <div className="flex items-center space-x-2">
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Deleting</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Delete</span>
          </div>
        )}
      </button>
    </li>
  );
}