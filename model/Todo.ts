import mongoose, { Schema, model, models } from "mongoose";

export interface ITodo {
  _id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TodoSchema = new Schema(
  {
    title: { 
      type: String, 
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"]
    },
    completed: { 
      type: Boolean, 
      default: false 
    },
  },
  {
    timestamps: true,
  }
);

// Use existing model or create new one
const Todo = models.Todo || model<ITodo>("Todo", TodoSchema);
export default Todo;