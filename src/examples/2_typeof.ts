//TypeScript adds a typeof operator you can use in a type context to refer to the type of a 
//variable or property (https://www.typescriptlang.org/docs/handbook/2/typeof-types.html)
const Todo = {
  title: 'Title',
  description: 'Desc',
  completed: false,
}

type TypeOfTodo = typeof Todo
