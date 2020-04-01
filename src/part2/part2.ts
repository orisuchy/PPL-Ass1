import R, { Pred } from "ramda";

/* Question 1 */
export const partition = (pred: Pred, arr:any[]) => {
    let arr1 = arr.filter(pred,arr);
    let arr2 = R.without(arr1,arr);
    let arr3: Array<any>[] = [arr1,arr2];
    return arr3;
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(partition(x => x % 2 === 0, numbers));

//hello - ori
/* Question 2 */
export const mapMat = (f:any, matrix:any[][])=>{
    return matrix.map(x=>x.map(f));
}

const mat = [ [1, 2, 3], [4, 5, 6], [7, 8, 9] ]
console.log(mapMat((x: number) => x * x, mat));

/* Question 3 */
export const composeMany = undefined;

/* Question 4 */
interface Languages {
    english: string;
    japanese: string;
    chinese: string;
    french: string;
}

interface Stats {
    HP: number;
    Attack: number;
    Defense: number;
    "Sp. Attack": number;
    "Sp. Defense": number;
    Speed: number;
}

interface Pokemon {
    id: number;
    name: Languages;
    type: string[];
    base: Stats;
}

export const maxSpeed = undefined;

export const grassTypes = undefined;

export const uniqueTypes = undefined;
