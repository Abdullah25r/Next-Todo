import Todo, { ITodo } from "@/model/Todo";
import { connectDB } from "@/lib/mongodb";
import TodoItem from "./TodoItem";

async function getTodos(): Promise<ITodo[]> {
  try {
    await connectDB();
    const todos = await Todo.find().sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(todos));
  } catch (error) {
    console.error("Failed to fetch todos:", error);
    return [];
  }
}

export default async function TodoList() {
  const todos = await getTodos();

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 text-center text-black">Your Todos</h2>
      
      {todos.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No todos yet. Add one above!
        </p>
      ) : (
        <ul className="space-y-3">
          {todos.map((todo) => (
            <TodoItem key={todo._id} todo={todo} />
          ))}
        </ul>
      )}
    </div>
  );
}