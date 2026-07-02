// AuditoriaEnergetica.js

const { MotorIndexacionBST } = require('./MotorIndexacionBST');

// --- Utilidad: generar palabras clave alfabéticas secuenciales ---
function generarPalabrasSecuenciales(cantidad) {
    const palabras = [];
    const letras = 'abcdefghijklmnopqrstuvwxyz';
    let contador = 0;
    while (palabras.length < cantidad) {
        let n = contador;
        let palabra = '';
        do {
            palabra = letras[n % 26] + palabra;
            n = Math.floor(n / 26) - 1;
        } while (n >= 0);
        palabras.push(palabra);
        contador++;
    }
    return palabras;
}

// --- Fisher-Yates shuffle ---
function fisherYatesShuffle(array) {
    const copia = [...array];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

// --- Búsqueda instrumentada con contador de ciclos CPU ---
function buscarConCiclos(motor, keyword) {
    let ciclosCPU = 0;
    let actual = motor.raiz;
    while (actual !== null) {
        ciclosCPU++;
        if (keyword === actual.keyword) {
            break;
        } else if (keyword < actual.keyword) {
            actual = actual.izquierdo;
        } else {
            actual = actual.derecho;
        }
    }
    return ciclosCPU;
}

const CANTIDAD = 20000;
const palabrasBase = generarPalabrasSecuenciales(CANTIDAD);
const ultimaPalabra = palabrasBase[palabrasBase.length - 1];

// 1. Simulación del peor escenario (orden alfabético estricto)
const motorDegenerado = new MotorIndexacionBST();
for (const palabra of palabrasBase) {
    motorDegenerado.indexar(palabra, `cache://${palabra}`);
}
const ciclosDegenerado = buscarConCiclos(motorDegenerado, ultimaPalabra);
console.log(`Búsqueda en árbol degenerado: ${ciclosDegenerado} ciclos de CPU`);

// 2. Refactorización sostenible (orden aleatorio - Fisher-Yates)
const motorBalanceado = new MotorIndexacionBST();
const palabrasBarajadas = fisherYatesShuffle(palabrasBase);
for (const palabra of palabrasBarajadas) {
    motorBalanceado.indexar(palabra, `cache://${palabra}`);
}
const ciclosBalanceado = buscarConCiclos(motorBalanceado, ultimaPalabra);
console.log(`Búsqueda en árbol pseudo-balanceado: ${ciclosBalanceado} ciclos de CPU`);

// 3. Cálculo de eficiencia
const ahorro = ((ciclosDegenerado - ciclosBalanceado) / ciclosDegenerado) * 100;
console.log(`Ahorro de ciclos de CPU: ${ahorro.toFixed(2)}%`);