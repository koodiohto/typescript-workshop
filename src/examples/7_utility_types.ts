//https://www.typescriptlang.org/docs/handbook/utility-types.html

//.e.g. Pick, Omit, Partial
type TodoPick = {
  title: string,
  description: string,
  completed: boolean,
}

type TodoWithOnlyTitleAndDesc = Pick<TodoPick, 'title' | 'description'>

type TodoWithOnlyTitleAndDesc2 = Omit<TodoPick, 'completed'>

type TodoWithEverythingGoes = Partial<TodoPick>

