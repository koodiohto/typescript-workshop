type MyTodo = {
    title: string,
    description: string,
    completed: boolean,
}

//1. Implement the TypeScript pick type (fairly easy)
type MyPickSolution<T, K extends keyof T> = {
    [Key in K]: T[Key]
}

type OnlyTitleAndDescSolution = MyPickSolution<MyTodo, 'title' | 'description'>

//2. Implement the Typescript Omit type without using existing utility types (medium)
type MyOmitSolution<T, K> = {
    //You can remap keys in mapped types using the "as" keyword.
    //In addition need to utilise a conditional deduction logic with the keys in the type (with ? : -syntax).
    //The never keyword is a way to represent the type of something that should never occur.
    [Key in keyof T as Key extends K ? never : Key]: T[Key]
}

type OnlyTitleAndDescSolution2 = MyOmitSolution<MyTodo, 'completed'>

//3: Type that will remove all boolean elements. 
type MyRemoveBooleansSolution<T> = {
    [Key in keyof T as (T[Key] extends boolean ? never : Key)]: T[Key]
}

type OnlyTitleAndDescSolution3 = MyRemoveBooleansSolution<MyTodo>

//4 Bonus: Or even more generic "OmitByType" where type is e.g. string (hard-)
//T[keyof T] = union of T's types, so e.g. string | boolean
type OmitByTypeSolution<T, U extends T[keyof T]> = {
    [Key in keyof T as (T[Key] extends U ? never : Key)]: T[Key]
}

type OnlyTitleAndDescSolution4 = OmitByTypeSolution<MyTodo, boolean>





