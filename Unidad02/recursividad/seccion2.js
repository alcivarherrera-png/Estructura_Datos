// EJERCICIO 2.1: Inversión de un Arreglo (In-Place)

function invertirArreglo(arr, inicio, fin) {
    if (inicio >= fin) {
        return;
    }
    let temporal = arr[inicio];
    arr[inicio]  = arr[fin];
    arr[fin]     = temporal;
    invertirArreglo(arr, inicio + 1, fin - 1);
}

let miLista = [10, 20, 30, 40, 50];
invertirArreglo(miLista, 0, miLista.length - 1);
console.assert(
    JSON.stringify(miLista) === JSON.stringify([50, 40, 30, 20, 10]),
    "Error en invertirArreglo"
);
console.log(" Ejercicio 2.1 superado.");

// EJERCICIO 2.2: Búsqueda Binaria Recursiva

function busquedaBinariaRecursiva(arr, objetivo, bajo, alto) {
    if (bajo > alto) {
        return -1;
    }
    const medio = Math.floor((bajo + alto) / 2);
    if (arr[medio] === objetivo) {
        return medio;
    }
    if (objetivo > arr[medio]) {
        return busquedaBinariaRecursiva(arr, objetivo, medio + 1, alto);
    }
    return busquedaBinariaRecursiva(arr, objetivo, bajo, medio - 1);
}

const datosOrdenados = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
console.assert(
    busquedaBinariaRecursiva(datosOrdenados, 23, 0, 9) === 5,
    "Error en busquedaBinaria(23)"
);
console.assert(
    busquedaBinariaRecursiva(datosOrdenados, 100, 0, 9) === -1,
    "Error en busquedaBinaria(100)"
);
console.log(" Ejercicio 2.2 superado.");