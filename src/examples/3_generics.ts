
//You can use generics in interfaces to make them more flexible. 
//It turns them into a kind of function, which can return different types depending on what you pass in.
//https://www.typescriptlang.org/docs/handbook/2/objects.html#generic-object-types
interface Box<Type> {
  contents: Type;
}
const stringBox: Box<String> = {contents: 'string'}
const stringBoxWithNumber: Box<String> = {contents: 1} //error

type StringBox = Box<String>
const stringBox2: StringBox = {contents: 'string'}




