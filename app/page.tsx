import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
            To-Do App
          </h1>        
          <TodoForm />
          <TodoList />
        </div>
      </div>
    </main>
  );
}