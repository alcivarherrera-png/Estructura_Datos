//Ejercicio 1
let palabra1 = true;
let palabra2 = Boolean(false);

let numero1 = 500;
let numero2 = Number(1000);

let big1 = 100n;
let big2 = BigInt(200);

let string1 = "Buenos Dias";
let string2 = String("Buenas Tardes");

let u1 = undefined;

//Ejercicio 2
console.log(`${palabra1} [${typeof palabra1}]`);
console.log(`${palabra2} [${typeof palabra2}]`);
console.log(`${numero1} [${typeof numero1}]`);
console.log(`${numero2} [${typeof numero2}]`);
console.log(`${big1} [${typeof big1}]`);
console.log(`${big2} [${typeof big2}]`);
console.log(`${string1} [${typeof string1}]`);
console.log(`${string2} [${typeof string2}]`);
console.log(`${u1} [${typeof u1}]`);

//Ejercicio 3
let cadena = "1234";
let valor1 = Number(cadena);
let valor2 = BigInt(valor1);
let valor3 = Boolean(valor2);

console.log(`${valor3} [${typeof valor3}]`);

//Ejercicio 4
let b = false + true;
let n = 500 - 250;
let b1 = 500n +100n;
let s = "Hola" + "Mundo";
let u = undefined + undefined;


console.log(`${b} [${typeof b}]`);  
console.log(`${n} [${typeof n}]`);
console.log(`${b1} [${typeof b1}]`);
console.log(`${s} [${typeof s}]`);
console.log(`${u} [${typeof u}]`); 

//Ejercicio 5
let b1 = false + 50;

let b3 = false + "50";

let n2 = 300 + false;
let n3 = 300 + "400";

let bi3 = 300n + "400";

let s1 = "500" + 600;
let s2 = "500" + 600n;
let s3 = "500" + false;
let s4 = "Hola " + 600;
let s5 = "Hola " + 600n;
let s6 = "Hola " + false;

console.log(`${b1} [${typeof b1}]`);    

console.log(`${b3} [${typeof b3}]`);    

console.log(`${n2} [${typeof n2}]`);   
console.log(`${n3} [${typeof n3}]`);   

console.log(`${bi3} [${typeof bi3}]`);  

console.log(`${s1} [${typeof s1}]`);   
console.log(`${s2} [${typeof s2}]`);   
console.log(`${s3} [${typeof s3}]`);   
console.log(`${s4} [${typeof s4}]`);   
console.log(`${s5} [${typeof s5}]`);    
console.log(`${s6} [${typeof s6}]`);    