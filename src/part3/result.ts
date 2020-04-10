/* Question 3 */

import { reduce } from "ramda";

export type Result<T> = Ok<T> | Failure

interface Ok<T> {
    tag: 'Ok';
    value: T;
}

interface Failure {
    tag: 'Failure';
    message: string;
}



export const makeOk = <T>(value: T): Ok<T> => ({ tag: "Ok", value: value });
export const makeFailure = (message: string): Failure => ({ tag: "Failure", message: message });

export const isOk = <T>(x: Result<T>): x is Ok<T> => x.tag === "Ok";
export const isFailure = <T>(x: Result<T>): x is Failure => x.tag === "Failure";

/* Question 4 */
export const bind = <T, U>(result: Result<T>, f: (x: T) => Result<U>): Result<U> => {
    if (isOk(result)) {
        const newResult = f(result.value);
        return newResult;
    }
    else (isFailure(result)); {
        return result;
    }
}

/* Question 5 */
interface User {
    name: string;
    email: string;
    handle: string;
}

const validateName = (user: User): Result<User> =>
    user.name.length === 0 ? makeFailure("Name cannot be empty") :
        user.name === "Bananas" ? makeFailure("Bananas is not a name") :
            makeOk(user);

const validateEmail = (user: User): Result<User> =>
    user.email.length === 0 ? makeFailure("Email cannot be empty") :
        user.email.endsWith("bananas.com") ? makeFailure("Domain bananas.com is not allowed") :
            makeOk(user);

const validateHandle = (user: User): Result<User> =>
    user.handle.length === 0 ? makeFailure("Handle cannot be empty") :
        user.handle.startsWith("@") ? makeFailure("This isn't Twitter") :
            makeOk(user);

export const naiveValidateUser = (user: User): Result<User> => {
    if (isFailure(validateName(user))) {
        return validateName(user);
    }
    if (isFailure(validateEmail(user))) {
        return validateEmail(user);
    }
    if (isFailure(validateHandle(user))) {
        return validateHandle(user);
    }
    return makeOk(user);
}

export const monadicValidateUser = (user: User): Result<User> => {
    const resultChecked = reduce(bind, validateName(user),[validateEmail, validateHandle]);
    return resultChecked;

    //This is wonderfull
    //arr.reduce((finalArr:Result<User>[],f) => finalArr.concat(f(user)),[]);

    //const resultChecked = reduce(bind, ([validateName(user), validateEmail(user), validateHandle(user)],isFailure,[]));
    //return resultChecked;
}

/*
arr = [1,2,3]
arr.reduce((acc, cur) => acc + cur, 0)

a = [[1, 2, 3], [4, 5, 6]]
a.reduce((acc, curr) => acc.concat(curr), [])

//example 1
const writer = bind(bind(makeWriter(5), square), half);
//example 2
const writer = makeWriter(5);
const squareAndHalved = reduce(bind, writer, [square, half])
*/