/*
 * JavaScript HomeWork
 *
 * Guillermo Gonzalez
 * 2025-02-24
 */

"use strict";

<<<<<<< HEAD
function firstNonRepeating(str){
    /*Se hizo en clase, pero basicamente es una lista de diccionarios
    que guardan los caracteres del string y las veces que aparecen.
    Despues de pasar por todo el string se verifica cual es el primer
    caracter agregado a la lista cuya cuenta es solamente 1. Ese es
    el primero que no se repite.
    */
=======
function firstNonRepeating(str) {
    // Create an empty array to store the candidates
    const candidates = [];
    // Check every character in the string
    for (let i=0; i<str.length; i++) {
        // Compare against the candidates
        let found = false;
        for (let cand of candidates) {
            // If the char had already been found, increase its counter
            if (cand.char == str[i]) {
                cand.count += 1;
                found = true;
            }
        }
        // If the char was not found, add it to the list
        if (!found) {
            candidates.push({char: str[i], count: 1});
        }
    }

    // Show the data structure generated
    // A list of objects
    console.log(candidates);

    // Look for the first char that appeared only once
    for (let index in candidates) {
        if (candidates[index].count == 1) {
            return candidates[index].char;
        }
    }
}
>>>>>>> upstream/2026.401

    //empty array
    const candidates = [];
    //check every character in the string
    for (let i = 0; i<str.length; i++){
        //compare against candidates
        let found = false;
        for(let cand of candidates){
            if (cand.char == str[i]){
                cand.count += 1;
                found = true;
        }
    }
    if(!found){
        candidates.push({char: str[i], count : 1});
    }
}
    for (let index in candidates){
        if (candidates[index].count == 1){
        return candidates[index].char;
        }
    }
}

function bubbleSort(lis){
    /*Revisas todos los numeros en un for y si un numero es mayor que
    el de su derecha los cambias de lugar. Realizas esto hasta que 
    el numero mas grande este en el ultimo puesto. Esto lo haces 
    multiples veces hasta que ya no se tengan que hacer cambios.
    */
    let checkChange;
    let n = lis.length;
    for(let i = 0; i < n; i++){
        checkChange = false;
        for (let j=0; j< n - i - 1; j++){
            if(lis[j] > lis[j+1]){
                let k = lis[j+1];
                lis[j+1]=lis[j];
                lis[j]=k;
                checkChange = true;
            }
        }
        if(!checkChange){
            break;
        }
    }
    return lis;
}

function invertArray(arr){
    /*En un for loop empiezas desde el ultimo numero de un array
    y lo agregas a un nuevo array como el primer numero. Haces
    esto hasta llegar al primer numero del array original.
    */
    let newArray = [];
    for (let i = arr.length - 1; i>=0; i--){
        newArray.push(arr[i]); 
    }
    return newArray;
}

function invertArrayInplace(arr){
    /*Realizas guardas el index del ultimo numero y luego reemplazas
    el valor del primer indice por el del ultimo y viceversa. Le 
    restas al indice del ultimo numero para bajar al penultimo y le
    sumas al del primero para llegar al segundo y asi sucesivamente.
    */
    let top_numbers = arr.length - 1;
    for (let i = 0; i <= top_numbers; i++){
        let placeholder = arr[i];
        arr[i] = arr[top_numbers];
        arr[top_numbers] = placeholder;
        top_numbers--;
    }
    return arr;
}

function capitalize(str){
    /*En un for loop revisas todos los caracteres. El primero se vuelve
    mayuscula automaticamente. A partir de ahi si no hay un espacio, solo
    se concatenan los caracteres a un nuevo string. Si hay un espacio
    el siguiente caracter que no sea espacio se capitaliza y luego
    concatena.
    */
    let new_str = "";
    let space_check = true;
    for (let i = 0; i < str.length; i++) {
        if (space_check && str[i] !== " ") {
            new_str += str[i].toUpperCase();
            space_check = false;
        } else {
            new_str += str[i];
        }

        if (str[i] === " ") {
            space_check = true;
        }
    }
    return new_str;
}

function mcd(num1, num2){
    /*Haces una lista de los divisores de cada numero y en un nested
    loop revisas si el numero de una lista se repite en la otra.
    Si ese es el caso, y ademas es mas grande que el maximo comun
    divisor previamente encontrado, lo almacenas como el nuevo mcd.
    Repites esto hasta que recorras ambos loops y te quedas con el
    numero en comun mas grande.
    */
    let num1_divs = [];
    let num2_divs = [];
    let max_div = 0;
    for (let i = 1; i <= num1; i++){
        if (num1%i == 0){
            num1_divs.push(i)
        }
    }
    for (let i = 1; i <= num2; i++){
        if (num2%i == 0){
            num2_divs.push(i)
        }
    }
    for (let i = 0; i < num1_divs.length; i++){
        for (let j = 0; j < num2_divs.length; j++){
            if(num1_divs[i] == num2_divs[j]){
                max_div = num1_divs[i];
            }
        }
    }
    return max_div;
}

function hackerSpeak(str){
    /*Solo revisas en un for loop si el character del string es
    uno de los que se debe reemplazar por numero. Si lo es, 
    concatenas a un nuevo string el numero, si no lo es, concatenas
    el caracter
    */
    let new_str = "";
    for (let i = 0; i < str.length; i++){
        if(str[i] == 'a' || str[i] == 'A'){
            new_str += '4';
        }
        else if(str[i] == 's' || str[i] == 'S'){
            new_str += '5';
        }
        else if(str[i] == 'i' || str[i] == 'I'){
            new_str += '1';
        }
        else if(str[i] == 'e' || str[i] == 'E'){
            new_str += '3';
        }
        else if(str[i] == 'o' || str[i] == 'O'){
            new_str += '0';
        }
        else{
            new_str += str[i];
        }
    }
    return new_str;
}
function factorize(num){
    /* Checas mediante un for loop si la division entre el numero
    proporcionado y el numero del for loop da un residuo. Si no
    lo da, añades el numero del foor loop a la lista de divisores
    */
    let num_divs = [];
    for (let i = 1; i <= num; i++){
        if (num%i == 0){
            num_divs.push(i)
        }
    }
    return num_divs;
}

function deduplicate(arr){
    /*creas un nuevo array y mediante un nested loop checas si el
    numero que estas viendo en el array original ya existe en el
    nuevo. Si es asi, solo no lo añades, pero si no esta haces un push
    para agregarlo al nuevo array.
    */
    let new_arr = [];
    for (let i = 0; i < arr.length; i++){
        let dup_check = false;
        for(let j = 0; j<new_arr.length; j++){
            if(new_arr[j] == arr[i]){
                dup_check = true;
            }
        }
        if(!dup_check){
            new_arr.push(arr[i]);
        }
    }
    return new_arr;
}

function findShortestString(arr){
    /*Verificas en un for loop la longitud de todos los strings
    del array y te quedas con la mas baja y la devuelves
    */
    let shortest_length = 0;
    let counter = 0;
    if(arr.length > 0){
        shortest_length = arr[0].length;
    }
    for (let i = 0; i < arr.length; i++){
        counter = arr[i].length;
        if(counter<shortest_length){
            shortest_length=counter;
        }
    }
    return shortest_length;
}

function isPalindrome(str){
    /*Mismo principio que en invert array, solo que ahora comparas
    los strings una vez que lo reescribes al reves
    */
    let new_str = "";
    for(let i = str.length-1; i>=0; i--){
        new_str += str[i];
    }
    if(new_str === str){
        return true;
    }
    return false;
}

function sortStrings(arr){
    /* Es un Bubble Sort pero para strings, ya que javascript 
    sortea de la A a la Z
    */
    let checkChange;
    let n = arr.length;
    for(let i = 0; i < n; i++){
        checkChange = false;
        for (let j=0; j< n - i - 1; j++){
            if(arr[j] > arr[j+1]){
                let k = arr[j+1];
                arr[j+1]=arr[j];
                arr[j]=k;
                checkChange = true;
            }
        }
        if(!checkChange){
            break;
        }
    }
    return arr;
}

function stats(arr){
    /*Es el mismo principio que la uno, lista de diccionarios donde 
    guardas el numero y la cantidad de veces que sale.En el loop
    vas sumando todos los numeros a la variable average.
    Despues de revisar toda la lista verificas el que tiene la cuenta
    mas grande y ese es la moda. Ademas divides la suma de los nums
    entre la cantidad de nums y ese es el promedio
    */
    let average = 0;
    let mode = 0;
    let max_count = 0;
    let final_list = [];
    const mode_candidates = [];
    for (let i = 0; i < arr.length; i++){
        let found = false;
        average += arr[i];
        for (let j = 0; j<mode_candidates.length; j++){
            if(mode_candidates[j].num == arr[i]){
                mode_candidates[j].count += 1;
                found = true;
            }
        }
        if(!found){
            mode_candidates.push({num: arr[i], count : 1});
        }
    }
    for(let i = 0; i < mode_candidates.length; i++){
        if(mode_candidates[i].count > max_count){
            mode = mode_candidates[i].num;
            max_count = mode_candidates[i].count;
        }
    }
    if(arr.length > 0){
    average = average/arr.length;
    }
    final_list.push(average);
    final_list.push(mode);
    return final_list;
}

function popularString(arr){
    /* Utilizas el mismo principio que en la primera de crear una
    lista de diccionarios donde un elemento es el string y el otro
    la cantidad de veces que se repite. Cuando acabas de recorrer
    todo el array y contar cuantas veces sale cada uno. Concatenas
    en un nuevo string el string del array que tenga la cuenta mas
    alta
    */
    const str_candidates = [];
    let max_count = 0;
    let popular_str = "";
    for (let i = 0; i < arr.length; i++){
        let found = false;
        for (let j = 0; j<str_candidates.length; j++){
            if(str_candidates[j].strs == arr[i]){
                str_candidates[j].count += 1;
                found = true;
            }
        }
        if(!found){
            str_candidates.push({strs: arr[i], count : 1});
        }
    }
    for(let i = 0; i < str_candidates.length; i++){
        if(str_candidates[i].count > max_count){
            max_count = str_candidates[i].count;
        }
    }
    for(let i = 0; i <str_candidates.length; i++){
        if(str_candidates[i].count == max_count){
            popular_str += str_candidates[i].strs;
            break;
        }
    }
    return popular_str;
}

function isPowerOf2(num){
    if (num == 0){
        return false;
    }
    while(num>1){
        if (num%2 != 0){
            return false;
        }
        num = num/2;
    }
    return true;
}

function sortDescending(lis){
    //Es un bubble sort pero lo inviertes para que el menor numero quede al ultimo

    let checkChange;
    let n = lis.length;
    for(let i = 0; i < n; i++){
        checkChange = false;
        for (let j=0; j< n - i - 1; j++){
            if(lis[j] < lis[j+1]){
                let k = lis[j+1];
                lis[j+1]=lis[j];
                lis[j]=k;
                checkChange = true;
            }
        }
        if(!checkChange){
            break;
        }
    }
    return lis;
}

export {
    firstNonRepeating,
<<<<<<< HEAD
=======
    /*
>>>>>>> upstream/2026.401
    bubbleSort,
    invertArray,
    invertArrayInplace,
    capitalize,
    mcd,
    hackerSpeak,
    factorize,
    deduplicate,
    findShortestString,
    isPalindrome,
    sortStrings,
    stats,
    popularString,
    isPowerOf2,
    sortDescending,
<<<<<<< HEAD
    };
=======
    */
};
>>>>>>> upstream/2026.401
