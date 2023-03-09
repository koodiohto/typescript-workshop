//Unions & intersections (https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html)
//A union type is a type formed from two or more other types, representing values that 
//may be any one of those types. We refer to each of these types as the union’s members.
//What about mathematical union & intersection vs. typescript versions, a bit confusing?
type StringNumberBool = string | number | boolean

//If we have a value that is a union type, we can only access 
//members that are common to all types in the union.
const printId = (id: number | string) => {
    id.toUpperCase() // toUpperCase does not exist in number | string
}

//Discriminated unions
//(https://www.typescriptlang.org/docs/handbook/2/objects.html)
interface Rectangle {
    kind: "rectangle"; //discriminant property
    width: number;
    height: number;
}

interface Circle {
    kind: "circle"; //discriminant property
    radius: number;
}

type Shape = Rectangle | Circle //discriminated union https://basarat.gitbook.io/typescript/type-system/discriminated-unions

const shape: Shape = { kind: "circle", radius: 5}
shape // circle
const shape2: Shape = { kind: "rectangle", radius: 5} //not a valid type found from Shape union

//What about intersection of these two?
type RectangleCircleNever = Rectangle & Circle //never union because of kind-property
type RectangleCircle = Omit<Rectangle, 'kind'> & Omit<Circle, 'kind'> & {kind: 'circlerect'} //union with Omit utility type

const shape4: RectangleCircle = { kind: "circlerect", radius: 5, width: 3, height:4 }

//intersection type (https://javascript.plainenglish.io/using-typescript-intersection-types-like-a-pro-a55da6a6a5f7)
//An intersection type combines multiple types into one
type Qube = Rectangle & {length: number}
//or with extends and interfaces
interface QubeInterface extends Rectangle {
    length: number
}
//another example
interface RequestWithPatientId extends Request {
    patientId: number
}


