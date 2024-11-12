export type List = {
  Id: string;
  Name: string;
};

export type Todo = {
  Id: string;
  Todo: string;
  Description: string;
  IsDone: boolean;
  ListId: string;
};
