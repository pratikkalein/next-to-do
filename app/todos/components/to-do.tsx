"use client";
import React, { useState } from "react";

interface TodoProps {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  onDelete: (id: number) => void;
  onEdit: (
    id: number,
    updatedTodo: { title: string; description?: string }
  ) => void;
  onToggleComplete: (id: number) => void;
}

const Todo: React.FC<TodoProps> = ({
  id,
  title,
  description,
  completed,
  onDelete,
  onEdit,
  onToggleComplete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description || "");

  const handleSave = () => {
    onEdit(id, { title: editTitle, description: editDescription });
    setIsEditing(false);
  };

  return (
    <div
      className={`p-4 border shadow-sm ${
        completed ? "bg-green-100" : "bg-gray-50"
      }`}
    >
      {isEditing ? (
        <>
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-2 py-1 mb-2 border text-black"
            placeholder="Edit title"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full px-2 py-1 mb-2 border text-black"
            placeholder="Edit description"
          />
          <button
            onClick={handleSave}
            className="mr-2 text-white bg-blue-500 px-3 py-1"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="text-white bg-gray-500 px-3 py-1 "
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <h3
            className={`font-bold text-black ${
              completed ? "line-through text-gray-500" : ""
            }`}
          >
            {title}
          </h3>
          {description && (
            <p className="text-sm text-gray-700">{description}</p>
          )}
          <div className="mt-2">
            <button
              onClick={() => setIsEditing(true)}
              className="mr-2 text-blue-500"
            >
              Edit
            </button>
            <button onClick={() => onDelete(id)} className="mr-2 text-red-500">
              Delete
            </button>
            <button
              onClick={() => onToggleComplete(id)}
              className={`${completed ? "text-gray-500" : "text-green-500"}`}
            >
              {completed ? "Mark Incomplete" : "Mark Complete"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Todo;
