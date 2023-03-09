//The keyof operator takes a type and returns a union of its keys.
interface Todo {
  title: string
  description: string
  completed: boolean
}

type KeysOfTodo = keyof Todo //title | description | completed

const titleKey: KeysOfTodo = 'title'