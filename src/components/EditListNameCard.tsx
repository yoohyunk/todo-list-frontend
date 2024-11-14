import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { changeListName } from "@/actions/list";
import { useState } from "react";

interface EditListNameCardProps {
  listId: string;
  onSubmitSuccess: () => void;
}

export const EditListNameCard = ({
  listId,
  onSubmitSuccess,
}: EditListNameCardProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        try {
          await changeListName(
            listId,
            (target.elements.namedItem("todoName") as HTMLInputElement).value
          );
          setIsSubmitted(true);
          onSubmitSuccess();
        } catch (error) {
          console.log("Error adding list", error);
        }
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Edit List Name</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            <input type="text" id="todoName" placeholder="New list name" />
          </CardDescription>
        </CardContent>
        <CardFooter>
          <button type="submit">Save</button>
        </CardFooter>
      </Card>
    </form>
  );
};
