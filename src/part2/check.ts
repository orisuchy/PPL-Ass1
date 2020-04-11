import R, { Pred } from "ramda";

export const composeMany : T = (arr:T[]) => {
//export const composeMany = (arr :{<T>(x:T) => (y:T)}[] => T) => {

    if (arr.length === 2)
          return R.compose(arr[0],arr[1]);        //compose(f,g) = f(g(x))
    return R.compose(arr[0],composeMany(arr.slice(1)));  
}