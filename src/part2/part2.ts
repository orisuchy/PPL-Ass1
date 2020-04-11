import R, { Pred } from "ramda";

/* Question 1 */
export const partition = <T>(pred: Pred, arr:T[]) => {
    let arr1 = arr.filter(pred,arr);
    let arr2 = R.without(arr1,arr);
    let arr3: Array<T>[] = [arr1,arr2];
    return arr3;
}


/* Question 2 */
export const mapMat = <T,U>(f:(x:T)=>U, matrix:T[][])=>{
    return matrix.map(x=>x.map(f));
}




export const composeMany = function<T>(arr:((x:T)=>T)[]) {
    return arr.reduce((acc, curr) => R.compose(acc,curr), x=>x);
}


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
   return pokedex.filter(x=>x.base.Speed === max);
}
///test///
/*
let pokemon1 = {id:1, name: {english:"a",japanese:"a",chinese:"b",french:"a"},type:["Fire","B"],base:{HP:1,Attack:1,Defense:1,"Sp. Attack": 1,"Sp. Defense":1, Speed:1}}
let pokemon2 = {id:1, name: {english:"abz",japanese:"a",chinese:"b",french:"a"},type:["A","Grass"],base:{HP:1,Attack:1,Defense:1,"Sp. Attack": 1,"Sp. Defense":1, Speed:2}}
let pikachu = {id:1, name: {english:"abpikapika",japanese:"a",chinese:"b",french:"a"},type:["sexy","funny","Grass"],base:{HP:1,Attack:1,Defense:1,"Sp. Attack": 1,"Sp. Defense":1, Speed:2}}
*/


export const grassTypes = (pokedex: Pokemon[])=>{
    
    let arr = pokedex.filter(x=>x.type.includes("Grass"));
    let names = arr.reduce((acc:string[],curr) => acc.concat(curr.name.english),[]);
    return names.sort();
}
///test///
/*
console.log("\ngrassTypes test:")
console.log(grassTypes([pokemon1, pokemon2, pikachu]));
*/


export const uniqueTypes = (pokedex: Pokemon[])=>{
    let allTypes = R.chain(x => x.type, pokedex);
    let filteredTypes =  allTypes.reduce((acc:string[],curr:string) => 
        acc.includes(curr)? acc.concat() : acc.concat(curr) , []);  
    return filteredTypes.sort();
}


///test///
/*
console.log("\nuniqueTypes test:")
console.log(uniqueTypes([pokemon1, pokemon2, pikachu]));
*/