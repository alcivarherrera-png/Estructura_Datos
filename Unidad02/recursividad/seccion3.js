class NodoArbol {
    constructor(valor) {
        this.valor = valor;
        this.izquierdo = null;
        this.derecho = null;
    }
}

// INORDEN: Izquierdo → Raíz → Derecho
function recorridoInorden(raiz) {

    // Caso base: árbol vacío
    if (raiz === null) {
        return [];
    }

    // Caso recursivo
    return [
        ...recorridoInorden(raiz.izquierdo),
        raiz.valor,
        ...recorridoInorden(raiz.derecho)
    ];
}

// PREORDEN: Raíz → Izquierdo → Derecho
function recorridoPreorden(raiz) {

    // Caso base: árbol vacío
    if (raiz === null) {
        return [];
    }

    // Caso recursivo
    return [
        raiz.valor,
        ...recorridoPreorden(raiz.izquierdo),
        ...recorridoPreorden(raiz.derecho)
    ];
}

// POSTORDEN: Izquierdo → Derecho → Raíz
function recorridoPostorden(raiz) {

    // Caso base: árbol vacío
    if (raiz === null) {
        return [];
    }

    // Caso recursivo
    return [
        ...recorridoPostorden(raiz.izquierdo),
        ...recorridoPostorden(raiz.derecho),
        raiz.valor
    ];
}

// Árbol de prueba
const raiz = new NodoArbol(10);
raiz.izquierdo = new NodoArbol(5);
raiz.derecho = new NodoArbol(15);
raiz.izquierdo.izquierdo = new NodoArbol(3);
raiz.izquierdo.derecho = new NodoArbol(7);
raiz.derecho.derecho = new NodoArbol(20);

// Validación
console.assert(
    JSON.stringify(recorridoInorden(raiz)) === JSON.stringify([3, 5, 7, 10, 15, 20]),
    "Error en recorridoInorden"
);

console.assert(
    JSON.stringify(recorridoPreorden(raiz)) === JSON.stringify([10, 5, 3, 7, 15, 20]),
    "Error en recorridoPreorden"
);

console.assert(
    JSON.stringify(recorridoPostorden(raiz)) === JSON.stringify([3, 7, 5, 20, 15, 10]),
    "Error en recorridoPostorden"
);

// Mostrar resultados
console.log("Inorden:", recorridoInorden(raiz));
console.log("Preorden:", recorridoPreorden(raiz));
console.log("Postorden:", recorridoPostorden(raiz));

console.log("Ejercicio 3.1 superado.");