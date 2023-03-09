type MyTodoExercise = {
    title: string,
    description: string,
    completed: boolean,
}

//1. Implement the Typescript pick type (fairly easy)
type MyPickExercise<T, K> = ???
//should be a type with only title, description, without completed
type OnlyTitleAndDesc = MyPickExercise<MyTodoExercise, 'title' | 'description'>

//2. Implement the Typescript Omit type without using existing utility types ("medium"), 
//You can remap keys in mapped types using the "as" keyword.
//"T extends string" is like T=string
//In addition need to utilise a conditional deduction logic with the keys in the type (with ? : -syntax).
//The never keyword can be used to represent something that should never occur.
type MyOmitExercise<T, K> = ???

//3: Type that will remove all string elements (medium+). 
type MyRemoveBooleansExercise<T> = ???

//4. Bonus: Or even more generic "OmitByType", where type is e.g. string (hard-).
type OmitByTypeSolutionExercise<T, U> = ???