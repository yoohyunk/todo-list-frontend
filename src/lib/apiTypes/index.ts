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
};

export type Collaborator = {
  Id: string;
};
