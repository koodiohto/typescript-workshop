//Introducing/refreshing some basic concepts.
//https://www.typescriptlang.org/
//https://github.com/microsoft/TypeScript
//https://www.typescriptlang.org/docs/handbook/intro.html
//One good blog source for advanced types: https://aishwarya2593.medium.com/create-wonders-with-advanced-typescript-types-525acf302770

//1. structural typing:
class Foo {
  x: number = 0;
}
class Blaa {
  x: number = 0;
}
let f: Foo = new Blaa();
let b: Blaa = new Foo();

//2. Type assertions
const c = b as Foo;

//3. literals and narrowing down to narrowest type:  
let limitToOnlyHello = "Hello" as const
limitToOnlyHello = "World" //error, only Hello allowed

//4. Using control flow analysis (CFA) to narrow down the type with following the JavaScript logic.
const square = (x: number | undefined) => {
  if(!x) {
    throw "Undefined";
  }
  return x * x;
}
const square2 = (x: number | undefined) => {
  if(typeof x !== "number") { //typeof type guard
    throw "Not a number";
  }
  return x * x;
}
const square3 = (x: number | undefined | string) => {
  if(typeof x === "string") { //typeof type guard
    throw "Not a number";
  }else if(!x) {
    throw "Undefined";
  }
  return x * x;
}
const square4 = (x: number | Date) => {
  if(x instanceof Date) { //Date is a class that can be initialized
    throw "Invalid type";
  }
  if(typeof x === "Date") {//Error: This comparison appears to be unintentional because the types '"string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"' and '"Date"' have no overlap.
    throw "Invalid type";
  }
  return x * x;
}

//Another example of (nested) CFA (https://retool.com/blog/typescript-control-flow-analysis-best-of/)
const doSomething = (x: string | number | boolean) => {
  const isString = typeof x === "string"
  const isNumber = typeof x === "number"
  const isStringOrNumber = isString || isNumber

  if (isStringOrNumber) {
    x // string | number
    if (typeof x === "number") {
      x //number
    }
  } else {
    x //boolean
  }
}

//5. Conditional types + extends keyword
//"T extends string", T=string
//In addition need to utilise a conditional deduction logic with the types (with ternary ? : -syntax).
type DerivedType = typeof c extends Foo ? Foo : Blaa;

//6. Bonus: still some peculiarities about narrowing https://www.typescriptlang.org/docs/handbook/2/narrowing.html
//JavaScript has an operator for determining if an object has a property with a name: the in operator. 
//TypeScript takes this into account as a way to narrow down potential types.
type Fish = { swim: () => void };
type Bird = { fly: () => void };
type Human = { swim?: () => void; fly?: () => void };
type Animal = Fish | Bird | Human
function move(animal: Animal) {
  if ("swim" in animal) { //Narrow down the type with JavaScript in operator
    animal //animal narrowed to Fish | Human
    if("fly" in animal){
        animal //animal narrowed to Human
    }else{
      animal //here it's still a Fish or Human, because TypeScript uses a concept called "control flow based type analysis" to determine the types of variables. This means that TypeScript can infer the type of a variable based on the control flow of the program, but it doesn't keep track of the types of variables within the different branches of the control flow. So, even though the type of animal was narrowed to Human in the previous block, TypeScript doesn't know that the type of animal is not Fish in the surrounding if-else block.
    }
  } else {
    animal //animal narrowed to Bird | Human
  }
  if(animal instanceof Fish){ //The instanceof operator is used to check the constructor of an object, but it doesn't work with discriminated unions. instanceof works by checking the prototype chain of an object, but since a union type can have multiple different prototypes, it can't determine the type correctly.
    animal
  }
}

type Foo3 = {
  x: number;
}
type NumberType = Foo3["x"]

//7. Bonus: Some confusing examples of Accessing type of a property
const x = new Foo().x;
type FooType = {
  x: number 
}
type XConst = typeof x
type X = Foo["x"];
type XType = FooType["x"];

//8. Bonus: Additional advanced features like the "infer" keyword are left for self study..