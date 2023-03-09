//The type predicate 'value is string' turns the function into a type guard which asserts the type.
const isString = (value: any): value is string => { //"value is xxx" = type predicate
    return typeof value === 'string';
}

const printLength = (value: string | number) => {
    if (isString(value)) {
        console.log(value.length);
    } else {
        console.log("Not a string");
    }
}