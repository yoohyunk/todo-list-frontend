"use client";
import { Input } from "@/components/ui/input";
import { addTodo } from "@/actions/todo";
import { Button } from "./ui/button";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";

export const AddTodoForm = () => {
  const params = useParams();
  const listId = Array.isArray(params.listId)
    ? params.listId[0]
    : params.listId || "";
  const [istodoNameClicked, setTodoNameClicked] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [dueDate, setDueDate] = useState<Date | undefined>();
  const [isSelectingStart, setIsSelectingStart] = useState(true); // Toggle for selecting start or due date

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    if (isSelectingStart) {
      setStartDate(selectedDate);
      setIsSelectingStart(false); // Switch to selecting due date
    } else {
      setDueDate(selectedDate);
      setIsSelectingStart(true); // Switch back to selecting start date
    }
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        try {
          await addTodo(
            listId,
            (target.elements.namedItem("todoName") as HTMLInputElement).value,
            (target.elements.namedItem("todoDescription") as HTMLInputElement)
              .value,
            startDate,
            dueDate
          );
        } catch (error) {
          console.log("Error adding list", error);
        }
      }}
      className="flex flex-col gap-1"
    >
      <div className="flex flex-row gap-1">
        <Input
          type="text"
          id="todoName"
          placeholder="Task name"
          onClick={() => setTodoNameClicked(true)}
          className=""
        />
        <Button type="submit" className="basis-4">
          +
        </Button>
      </div>
      {istodoNameClicked && (
        <div>
          <Textarea
            id="todoDescription"
            placeholder="Description"
            className=""
          />
          <div>
            <p>
              Selecting:{" "}
              <strong>{isSelectingStart ? "Start Date" : "Due Date"}</strong>
            </p>
            <Calendar
              mode="single"
              onSelect={(date) => handleDateSelect(date)}
              disabled={(date) =>
                isSelectingStart
                  ? date < today // Disable past dates for startDate
                  : startDate
                  ? date < startDate // Disable dates before startDate for dueDate
                  : date < today
              }
              className="rounded-md border"
            />
          </div>
          <div>
            <p>
              Start Date: {startDate?.toLocaleDateString() || "Not selected"}
            </p>
            <p>Due Date: {dueDate?.toLocaleDateString() || "Not selected"}</p>
          </div>
        </div>
      )}
    </form>
  );
};
