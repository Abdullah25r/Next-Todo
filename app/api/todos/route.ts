import { NextResponse } from "next/server";
import Todo from "@/model/Todo";
import { connectDB } from "@/lib/mongodb";

// GET all todos
export async function GET() {
  try {
    console.log("🔄 GET /api/todos - Fetching todos...");
    await connectDB();
    const todos = await Todo.find().sort({ createdAt: -1 });
    console.log(`✅ Found ${todos.length} todos`);
    return NextResponse.json(todos);
  } catch (error: any) {
    console.error("❌ Error fetching todos:", error);
    return NextResponse.json(
      { error: "Failed to fetch todos" }, 
      { status: 500 }
    );
  }
}

// POST a new todo
export async function POST(req: Request) {
  try {
    console.log("🔄 POST /api/todos - Creating new todo...");
    const body = await req.json();
    console.log("📝 Request body:", body);
    
    const { title } = body;
    
    if (!title || title.trim().length === 0) {
      console.log("❌ Title validation failed");
      return NextResponse.json(
        { error: "Title is required" }, 
        { status: 400 }
      );
    }

    await connectDB();
    console.log("✅ Database connected, creating todo...");

    const newTodo = await Todo.create({ 
      title: title.trim() 
    });
    
    console.log("✅ Todo created successfully:", newTodo);
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error: any) {
    console.error("❌ Error creating todo:", error);
    return NextResponse.json(
      { error: "Failed to create todo" }, 
      { status: 500 }
    );
  }
}


export async function DELETE(req: Request) {
  try {
    console.log("🔄 DELETE /api/todos - Deleting todo...");
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    console.log("🗑️ Deleting todo with ID:", id);

    if (!id) {
      console.log("❌ Todo ID is required");
      return NextResponse.json(
        { error: "Todo ID is required" }, 
        { status: 400 }
      );
    }

    await connectDB();
    console.log("✅ Database connected, deleting todo...");

    const deletedTodo = await Todo.findByIdAndDelete(id);
    
    if (!deletedTodo) {
      console.log("❌ Todo not found with ID:", id);
      return NextResponse.json(
        { error: "Todo not found" }, 
        { status: 404 }
      );
    }

    console.log("✅ Todo deleted successfully:", deletedTodo);
    return NextResponse.json(
      { message: "Todo deleted successfully" }
    );
  } catch (error: any) {
    console.error("❌ Error deleting todo:", error);
    return NextResponse.json(
      { error: "Failed to delete todo" }, 
      { status: 500 }
    );
  }
}