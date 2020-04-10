/* Question 3 */

export type Result<T> = Ok<T> | Failure

interface Ok <T>{
    tag: 'Ok';
    value: T;
}

interface Failure {
    tag: 'Failure';
    message: string;
}



export const makeOk = <T>(value: T): Ok<T> => ({ tag: "Ok", value: value});
export const makeFailure = (message: string): Failure => ({ tag: "Failure", message: message});

export const isOk = <T>(x:Result<T>): x is Ok<T> => x.tag === "Ok";
export const isFailure = <T>(x:Result<T>): x is Failure => x.tag === "Failure";

/* Question 4 */
export const bind = <T, U>(result: Result<T>, f: (x: T) => Result<U>): Result<U> => {
    if (isOk(result)){
        const newResult = f(result.value);
        return newResult;
    }
    else (isFailure(result));{
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

export const naiveValidateUser = undefined;

export const monadicValidateUser = undefined;