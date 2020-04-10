import { reduce } from "ramda";
interface Writer<T> {
    tag: "Writer";
    value: T;
    log: string[];
    }
    const isWriter = <T>(x: any): x is Writer<T> => x.tag === "Writer";
    const makeWriter = <T>(value: T): Writer<T> => ({ tag: "Writer", value: value, log: [] });
    const square = (x: number): Writer<number> =>
    ({ tag: "Writer", value: x * x, log: ['${x} was squared'] });
    const half = (x: number): Writer<number> =>
    ({ tag: "Writer", value: x / 2, log: ['${x} was halved'] });    
const bind = <T, U>(writer: Writer<T>, f: (x: T) => Writer<U>): Writer<U> => {
    const newWriter = f(writer.value);
    return {
    tag: "Writer",
    value: newWriter.value,
    log: writer.log.concat(newWriter.log)
    };
    }

const writer = makeWriter(5);
const squareAndHalved = reduce(bind, writer, [square, half]);
console.log(squareAndHalved);