const {generarDatosPrueba} = require('./RegistroAmbiental');
const {GestorRegistrosVerdes} = require('./GestorRegistrosVerdes');

const gestor = new GestorRegistrosVerdes();

console.log("\n=== COMPARACIÓN DE BÚSQUEDAS ===\n");

// Generación de datasets
const dataset25K = generarDatosPrueba(25000);

const dataset500K = generarDatosPrueba(500000);

const dataset1M =generarDatosPrueba(1000000);

const escenarios = [
    {nombre: "25K", datos: dataset25K, idBuscado: 24999},
    {nombre: "500K",datos: dataset500K, idBuscado: 499999},
    {nombre: "1M",datos: dataset1M, idBuscado: 999999}
];

escenarios.forEach(
    ({ nombre, datos, idBuscado }) => {

        console.log(`\n========== DATASET ${nombre} ==========`);
        // BÚSQUEDA SECUENCIAL
        let inicio =performance.now();
        let indiceSec =gestor.busquedaSecuencial(datos, idBuscado);

        let fin =performance.now();

        console.log(`Búsqueda Secuencial -> Índice: ${indiceSec}`);

        console.log( `Tiempo: ${(fin - inicio).toFixed(4)} ms`);

        // MERGE SORT

        inicio = performance.now();

        gestor.mergeSort(datos, 0, datos.length - 1);
        fin = performance.now();

        console.log(`Tiempo Merge Sort: ${(fin - inicio).toFixed(4)} ms`);

        // BÚSQUEDA BINARIA

        inicio =performance.now();

        let indiceBin =gestor.busquedaBinaria(datos, idBuscado );

        fin = performance.now();

        console.log(`Búsqueda Binaria -> Índice: ${indiceBin}`);

        console.log(`Tiempo: ${(fin - inicio).toFixed(4)} ms`);
    }
);