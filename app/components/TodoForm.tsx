"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title.trim() }),
      });

      setTitle("");
      router.refresh(); // Refresh server components to show new todo
    } catch (error) {
      console.error("Failed to add todo:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={addTodo} className="mb-8">
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a new task..."
          className="border border-gray-300 text-black p-3 flex-1 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isSubmitting}
          maxLength={100}
        />
        <button
          type="submit"
          disabled={!title.trim() || isSubmitting}
          className="bg-blue-500 cursor-pointer text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? "Adding..." : "Add"}
        </button>
      </div>
      <p className="text-sm text-gray-500 mt-2">
        {title.length}/100 characters
      </p>
    </form>
  );
}