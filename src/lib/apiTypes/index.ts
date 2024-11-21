export type List = {
  Id: string;
  Name: string;
  TodoCount: number;
};

export type Todo = {
  Id: string;
  Todo: string;
  Description: string;
  IsDone: boolean;
  ListId: string;
  StartDate: string | null;
  DueDate: string | null;
};

export type Collaborator = {
  Id: string;
};
