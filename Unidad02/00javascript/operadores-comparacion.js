/*
==
===!=
!=
!==

>
<

AND
&&

OR
||

NOT
!

*/

//OPERADORES DE COMPARACION

// == (igualdad con conversion de tipo)
const numero = 5
const texto = "5"

console.log(numero == texto) // true

// === (igualdad estricta)
const numero = 5
const texto = "5"

console.log(numero === texto) // false

// != (diferente con conversion de tipo)
const numero = 5
const texto = "10"

console.log(numero != texto) // true

// !== (diferente estricto)
const numero = 5
const texto = "5"

console.log(numero !== texto) // true

// > (mayor que)
const edad = 20

console.log(edad > 18) // true

// < (menor que)
const temperatura = 15

console.log(temperatura < 20) // true

// AND (&&)
// Ambas condiciones deben ser verdaderas
const edad = 25
const tieneLicencia = true

console.log(edad >= 18 && tieneLicencia) // true

// OR (||)
// Al menos una condicion debe ser verdadera
const esEstudiante = false
const tieneDescuento = true

console.log(esEstudiante || tieneDescuento) // true

// NOT (!)
// Invierte el valor booleano
const activo = true

console.log(!activo) // false

//CONDICIONAL COMPLETA

const usuario = "admin"
const contraseña = "1234"
const edad = 20

if (usuario === "admin" && contraseña === "1234" && edad >= 18) {
    console.log("Acceso permitido")
} else {
    console.log("Acceso denegado")
}

const tieneEntrada = false
const esInvitado = true

if (!tieneEntrada || esInvitado) {
    console.log("Puede ingresar")
} else {
    console.log("No puede ingresar")
}

const a = 10
const b = 20
const c = "30"
a == b
a === b
a === c
a == c