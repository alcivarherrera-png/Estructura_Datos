const numeroSecreto = Math.floor(Math.random() * 10 + 1)
const numeroJugador = parseInt(prompt("Adivina el numero secreto entre 1 y 10"))

console.log(`Este es el numero con el que juegas: ${numeroJugador}`)

if (numeroJugador === numeroSecreto){
    console.log("FELICIDADES, GANASTE!!")
} else if (numeroJugador < numeroSecreto){
    console.log("tu numero es menor!!! intenta nuevamente")
} else {
    console.log("tu numero es mayor!!! intenta nuevamente")
}
