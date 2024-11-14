import { getTodosCompleted, getTodosNotCompleted } from "@/actions/todo";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const ListSideBarDetails = async ({ listID }: { listID: string }) => {
  const { Todos: completedTodos } = await getTodosCompleted(listID);
  const { Todos: notCompletedTodos } = await getTodosNotCompleted(listID);
  const totalTodos = completedTodos.length + notCompletedTodos.length;

  return (
    <div className="flex flex-col gap-4 p-2">
      <div className="flex flex-col gap-2">
        <h2>Progress</h2>
        <Progress value={(completedTodos.length / totalTodos) * 100} />
      </div>
      <div className="flex flex-col gap-2">
        <h2>Completed tasks</h2>
        <Accordion type="single" collapsible>
          {completedTodos.map((todo) => (
            <AccordionItem value={todo.Id} key={todo.Id}>
              <div className="flex items-center gap-4">
                <AccordionTrigger>{todo.Todo} </AccordionTrigger>
              </div>
              <AccordionContent className="text-gray-500 text-xs ml-8">
                {todo.Description}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
