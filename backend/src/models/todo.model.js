const { Schema, model } = require("mongoose");
const { TODO_PIORITY } = require("../enums/todo.enum");
const todoSchema = new Schema(
  {
    auther: { type: Schema.ObjectId, ref: "user", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    isCompleted: { type: Boolean, default: false },
    priority: { type: String, enum: TODO_PIORITY, default: "low" },
    deadline: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = model("todo", todoSchema);
