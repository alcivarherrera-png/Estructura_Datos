// EJERCICIO 1.1: Suma de Dígitos de un Número

function sumaDigitos(n) {
    // CASO BASE: número de un solo dígito, se devuelve tal cual
    if (n < 10) {
        return n;
    }
    // CASO RECURSIVO: sumamos el último dígito (n % 10) y llamamos recursivamente con el número sin ese dígito
    return (n % 10) + sumaDigitos(Math.floor(n / 10));
}

console.assert(sumaDigitos(1243) === 10, "Error en sumaDigitos(1243)");
console.assert(sumaDigitos(0) === 0,     "Error en sumaDigitos(0)");
console.assert(sumaDigitos(9) === 9,     "Error en sumaDigitos(9)");
console.log(" Ejercicio 1.1 superado.");


/** EJERCICIO 1.2: Potencia Recursiva (Exponenciación Binaria) */

function potencia(base, exponente) {
    // CASO BASE: cualquier número elevado a 0 es 1
    if (exponente === 0) {
        return 1;
    }
    // CASO RECURSIVO — exponente PAR:
    // base^exp = (base^(exp/2))^2  →  reduce el problema a la mitad → O(log n)
    if (exponente % 2 === 0) {
        const mitad = potencia(base, exponente / 2);
        return mitad * mitad;
    }
    // CASO RECURSIVO — exponente IMPAR:
    // base^exp = base * base^(exp-1)
    // exp-1 es par, por lo que la siguiente llamada lo reduce a la mitad
    return base * potencia(base, exponente - 1);
}

console.assert(potencia(2, 10) === 1024, "Error en potencia(2, 10)");
console.assert(potencia(5, 3)  === 125,  "Error en potencia(5, 3)");
console.assert(potencia(7, 0)  === 1,    "Error en potencia(7, 0)");
console.log(" Ejercicio 1.2 superado.");