import React, { useState } from "react";
import { editTodoName, editTodoDescription } from "@/actions/todo";
import { LuCheck } from "react-icons/lu";
import { AddTodoCollaborator } from "./AddTodoCollaborator";

export const EditTodoComponent = ({
  listId,
  todoId,
  todoCollaborator,
  todoOwner,
  initialName,
  initialDescription,
  onSave,
  onCancel,
}: {
  listId: string;
  todoId: string;
  todoCollaborator: string[];
  todoOwner: string;
  initialName: string;
  initialDescription: string;
  onSave: () => void;
  onCancel: () => void;
}) => {
  const [todoName, setTodoName] = useState(initialName);
  const [todoDescription, setTodoDescription] = useState(initialDescription);
  const [isLoading, setIsLoading] = useState(false);
  const [collaboratorsUpdated, setCollaboratorsUpdated] = useState(false);

  const handleCollaboratorsUpdate = () => {
    setCollaboratorsUpdated(true);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await editTodoName(listId, todoId, todoName);
      await editTodoDescription(listId, todoId, todoDescription);
      setIsLoading(false);
      if (onSave) onSave();
    } catch (error) {
      console.error("Error saving todo changes:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <input
        type="text"
        value={todoName}
        onChange={(e) => setTodoName(e.target.value)}
        className="rounded-md border px-2 py-1 text-sm"
        placeholder="Edit todo name"
      />
      <textarea
        value={todoDescription}
        onChange={(e) => setTodoDescription(e.target.value)}
        className="rounded-md border px-2 py-1 text-sm"
        placeholder="Edit todo description"
      />
      {collaboratorsUpdated && (
        <p className="text-sm text-green-500">Collaborators updated</p>
      )}
      <AddTodoCollaborator
        listId={listId}
        todoId={todoId}
        collaborators={todoCollaborator}
        owner={todoOwner}
        onSubmitSuccess={handleCollaboratorsUpdate}
      />
      <div className="flex justify-end p-2">
        <button
          onClick={onCancel}
          className="border-solid p-2 text-sm mt-2 flex items-center"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="border-solid p-2 text-sm mt-2 flex items-center"
          disabled={isLoading}
        >
          <LuCheck />
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};
