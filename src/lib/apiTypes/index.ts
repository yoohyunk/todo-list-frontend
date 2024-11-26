import { list } from "postcss";

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
  Collaborators: string[];
  Owner: string;
};

export type Collaborator = {
  Id: string;
};
