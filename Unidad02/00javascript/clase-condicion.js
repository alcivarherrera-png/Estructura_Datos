/*
Condicionales
*/

//If simple
const edad = 18

if (edad >= 18) {
    console.log("Es mayor de edad")
}

//If - Else
const temperatura = 15

if (temperatura > 20) {
    console.log("Hace calor")
} else {
    console.log("Hace frio")
}
 
//If - Else If - Else
const nota = 85

if (nota >= 90) {
    console.log("Excelente")
} else if (nota >= 70) {
    console.log("Aprobado")
} else {
    console.log("Reprobado")
}

//Comparacion de numeros
const numero1 = 10
const numero2 = 20

if (numero1 > numero2) {
    console.log("numero1 es mayor")
} else {
    console.log("numero2 es mayor")
}

//Condicional usando una operacion matematica
const numero = 15
const modulo = numero % 2

if (modulo === 0) {
    console.log("El numero es par")
} else {
    console.log("El numero es impar")
}

//Switch
const dia = 3

switch (dia) {
    case 1:
        console.log("Lunes")
        break
    case 2:
        console.log("Martes")
        break
    case 3:
        console.log("Miercoles")
        break
    default:
        console.log("Dia no valido")
}

//Operador ternario
const edadUsuario = 16

const mensaje = edadUsuario >= 18
    ? "Mayor de edad"
    : "Menor de edad"

console.log(mensaje)

let nombre = "Fernando"
if (nombre == "Fernando") {
    console.log("Hola Fer")
} else if (nombre == "Cristian"){
    console.log("Hola Cris")
}else {
    console.log("No encontre tu nombre")
}
