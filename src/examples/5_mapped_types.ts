
//1. Basic mapping of type
//A mapped type is the process of creating a new type by mapping type 
//information from an existing type. 
//The in operator maps over each item in the union type to create a new type. 
//In other words, the in operator allows us to loop through each type in a union type.
//(https://learntypescript.dev/08/l2-mapped-type).
//https://javascript.plainenglish.io/using-typescript-mapped-types-like-a-pro-be10aef5511a

//type MappedTypeName = { [K in UnionType]: ExistingType };
//type MappedTypeName = {[K in keyof ExistingType1]: ExistingType2;};

interface Todo {
    title: string
    description: string
    completed: boolean
}

//k in ...
//..manually. Try adding something else to in
type TodoConstucted = {[K in "title" | "description" | "completed"]: Todo[K]}
//..utilizing keyof
type TodoConstucted2 = {[K in keyof Todo]: Todo[K]}

//2. Some examples of mapped types with generics
type MyMakeOptional<T> = {
    [P in keyof T]?: T[P];
};

//-? expression
type MyRemoveOptional<T> = {
    [P in keyof T]-?: T[P];
};

type MyReadonly<T> = {
    readonly [P in keyof T]: T[P];
};

const optionalTodo: MyMakeOptional<Todo> = { title: 'Optional todo' };
const readOnlyTodo: MyReadonly<Todo> = { title: 'Read only todo', description: 'desc', completed: false };
readOnlyTodo.title = 'Todo 2'; // Error: Cannot assign to 'Todo 2' because it mapped to a read-only property.

//In exercises will be implementing the pick type similarly.

//3. Union type of the values in an array with [number]-syntax
const myArray = ['one', 'two'] as const
type ArrayType = typeof myArray
type ValidNumber = typeof myArray[number]
//why not this?
type ValidNumber2 = typeof myArray[keyof ArrayType]
//what about this, arrays are actually objects, aren't they? (//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections#Array_object)?
type ValidNumber3 = typeof myArray[0 | 1] 

//4. Index signatures ([key: xxx]) (https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures, https://blog.logrocket.com/typescript-mapped-types/)
type User = {
    name: string;
    preferences: {
      [key: string]: string;
    }
};
const currentUser: User = {
    name: 'Foo Bar',
    preferences: {
        lang: 'en',
    },
};

//5. Mapping allows future additions to reflect on depending types "automatically" (https://blog.logrocket.com/typescript-mapped-types/)
type AppConfig = { 
    username: string,
    layout: string,
    //more in the future possibly, try adding here something
}
// Whether or not the user has permission to change configuration values
type AppPermissions = {
    // Notice the as-keyword
    // Notice template literal `change${Type}` 
    // and "intrinsic string manipulation" (Capitalize) 
    //(https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
    [Key in keyof AppConfig as `change${Capitalize<Key>}`]: boolean
}
const appPermission: AppPermissions = {changeUsername: true, changeLayout: false}