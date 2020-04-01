import R, { Pred } from "ramda";

/* Question 1 */
//Need to change the 'any' to generic type <T>
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
///test///
const f = (x:any) => x+1;
console.log(R.compose(f));
const mat = [ [1, 2, 3], [4, 5, 6], [7, 8, 9] ]
console.log(mapMat((x: number) => x * x, mat));

/* Question 3 */
export const composeMany : any = (arr:any[]) => {
    if (arr.length === 2)
          return R.compose(arr[0],arr[1]);        //compose(f,g) = f(g(x))
    return R.compose(arr[0],composeMany(arr.slice(1)));  
}

///test///
const squareAndHalf = composeMany([(x: number) => x / 2, (x: number) => x * x]);
console.log(squareAndHalf(5)); // => 12.5
const add3 = composeMany([(x: number) => x + 1, (x: number) => x + 1, (x: number) => x + 1]);
console.log(add3(5))



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

export const maxSpeed = (pokedex: Pokemon[])=>{
   let max = pokedex.reduce((acc,cur) => Math.max(acc,cur.base.Speed), 0);
   return pokedex.filter(x=>x.base.Speed === max)[0].type;
}
///test///
let pokemon1 = {id:1, name: {english:"a",japanese:"a",chinese:"b",french:"a"},type:["Fire","b"],base:{HP:1,Attack:1,Defense:1,"Sp. Attack": 1,"Sp. Defense":1, Speed:1}}
let pokemon2 = {id:1, name: {english:"abz",japanese:"a",chinese:"b",french:"a"},type:["a","Grass"],base:{HP:1,Attack:1,Defense:1,"Sp. Attack": 1,"Sp. Defense":1, Speed:2}}
let pikachu = {id:1, name: {english:"abpikapika",japanese:"a",chinese:"b",french:"a"},type:["sexy","funny","Grass"],base:{HP:1,Attack:1,Defense:1,"Sp. Attack": 1,"Sp. Defense":1, Speed:3}}
console.log(maxSpeed([pokemon1, pokemon2, pikachu]));


export const grassTypes = (pokedex: Pokemon[])=>{
    
    let arr = pokedex.filter(x=>x.type.includes("Grass"));
    let names = arr.reduce((acc:any,curr) => acc.concat(curr.name.english),[]);
    return names.sort();
}
///test///
console.log(grassTypes([pokemon1, pokemon2, pikachu]));


export const uniqueTypes = (pokedex: Pokemon[])=>{
    return R.chain(x => x.type, pokedex);
}
///test///
console.log(uniqueTypes([pokemon1, pokemon2, pikachu]));