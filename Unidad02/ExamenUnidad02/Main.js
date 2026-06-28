const GestorDeEntregas   = require("./GestorDeEntregas");
const OrdenamientoEnvios = require("./OrdenamientoDePaquetes");
const RastreoRecursivo   = require("./Rastreo");

const gestor = new GestorDeEntregas();

// ─────────────────────────────────────────────
// DATOS ALEATORIOS
// ─────────────────────────────────────────────
const destinos = [
    "Av. Principal 123",   "Calle Norte 45",      "Urb. Sur 78",
    "Sector Este 12",      "Zona Oeste 34",        "Centro Histórico 56",
    "Av. Las Américas 90", "Calle Rocafuerte 11",  "Urb. Alborada 7",
    "Vía a la Costa km 5", "Cdla. Guayacanes 3",  "Urb. Urdesa Central",
    "Av. Quito km 2",      "Sector Los Ceibos 8",  "Calle Boyacá 100"
];

const tipos = [
    "Laptop",    "Celular",    "Libros",    "Ropa",         "Zapatos",
    "Juguetes",  "Cosméticos", "Repuestos", "Electrodoméstico",
    "Alimentos", "Herramientas","Perfumes", "Accesorios",   "Equipos"
];

function generarPaqueteAleatorio(indice, urgente = false) {
    const tipo    = tipos[Math.floor(Math.random() * tipos.length)];
    const nombre  = `${tipo}-${indice}`;
    const peso    = +(Math.random() * 20 + 0.1).toFixed(2);
    const destino = destinos[Math.floor(Math.random() * destinos.length)];
    return { nombre, peso, destino, urgente };
}

// Silencia logs durante operaciones masivas
function silenciar()  { console.log = () => {}; }
function restaurar()  { console.log = originalLog; }
const originalLog = console.log;

// ─────────────────────────────────────────────
// FASE 1 — Carga masiva de 25,000 paquetes
// ─────────────────────────────────────────────
console.log("═".repeat(60));
console.log("   SISTEMA DE GESTIÓN DE ENTREGA DE PAQUETES");
console.log("═".repeat(60));
console.log("\n FASE 1 — Generando y registrando 25,000 paquetes aleatorios...");

const TOTAL         = 25000;
const URGENTE_CADA  = 50;     // cada 50 paquetes, uno es urgente

silenciar();
for (let i = 1; i <= TOTAL; i++) {
    const esUrgente          = (i % URGENTE_CADA === 0);
    const { nombre, peso, destino } = generarPaqueteAleatorio(i, esUrgente);
    gestor.registrarPaquete(nombre, peso, destino, esUrgente);
}
restaurar();

console.log(" 25,000 paquetes registrados exitosamente.");
console.log(`   Paquetes normales (FIFO) : ${gestor.colaDespacho.tamaño.toLocaleString()}`);
console.log(`   Paquetes urgentes (LIFO) : ${gestor.pilaUrgente.paquetes.length.toLocaleString()}`);

// ─────────────────────────────────────────────
// FASE 2 — Estado inicial
// ─────────────────────────────────────────────
console.log("\n" + "─".repeat(60));
console.log(" FASE 2 — ESTADO INICIAL DEL SISTEMA");
console.log("─".repeat(60));

gestor.mostrarEstado();
console.log(`   Puntero inicio : ${gestor.colaDespacho.inicio}`);
console.log(`   Puntero fin    : ${gestor.colaDespacho.fin}`);
console.log(`   Capacidad      : ${gestor.colaDespacho.capacidad.toLocaleString()}`);
console.log(`\n   Primero en despachar (FIFO) : "${gestor.colaDespacho.verSiguiente()?.nombre}"`);
console.log(`   Urgente en cima      (LIFO) : "${gestor.pilaUrgente.verCima()?.nombre}"\n`);

// ─────────────────────────────────────────────
// FASE 3 — Despacho parcial para demostrar
//           reciclaje de la cola circular
// ─────────────────────────────────────────────
console.log("─".repeat(60));
console.log("  FASE 3 — DESPACHO PARCIAL Y RECICLAJE DE MEMORIA");
console.log("─".repeat(60));

const DESPACHAR = 10000;
console.log(`\n🚚 Despachando ${DESPACHAR.toLocaleString()} paquetes...`);

silenciar();
for (let i = 0; i < DESPACHAR; i++) {
    gestor.procesarEntrega();
}
restaurar();

console.log(` ${DESPACHAR.toLocaleString()} paquetes despachados.`);
console.log(`\n Estado tras el despacho parcial:`);
console.log(`   Puntero inicio (avanzó)  : ${gestor.colaDespacho.inicio.toLocaleString()}`);
console.log(`   Puntero fin              : ${gestor.colaDespacho.fin.toLocaleString()}`);
console.log(`   Posiciones liberadas     : ${gestor.colaDespacho.inicio.toLocaleString()}`);
console.log(`   Elementos activos        : ${gestor.colaDespacho.tamaño.toLocaleString()}\n`);

// ─────────────────────────────────────────────
// FASE 4 — Nuevos paquetes reciclan posiciones
// ─────────────────────────────────────────────
console.log("─".repeat(60));
console.log(" FASE 4 — NUEVOS PAQUETES RECICLAN POSICIONES LIBERADAS");
console.log("─".repeat(60));

const NUEVOS = 8000;
console.log(`\n Encolando ${NUEVOS.toLocaleString()} paquetes nuevos sobre posiciones recicladas...`);

silenciar();
for (let i = TOTAL + 1; i <= TOTAL + NUEVOS; i++) {
    const { nombre, peso, destino } = generarPaqueteAleatorio(i);
    gestor.registrarPaquete(nombre, peso, destino);
}
restaurar();

console.log(` ${NUEVOS.toLocaleString()} paquetes nuevos encolados.`);
console.log(`\n Estado tras el reciclaje:`);
console.log(`   Puntero inicio   : ${gestor.colaDespacho.inicio.toLocaleString()}`);
console.log(`   Puntero fin      : ${gestor.colaDespacho.fin.toLocaleString()}  ← creció desde posición reciclada`);
console.log(`   Elementos activos: ${gestor.colaDespacho.tamaño.toLocaleString()}`);
console.log(`   Capacidad total  : ${gestor.colaDespacho.capacidad.toLocaleString()}`);
console.log(`\n   Próximo en despachar (FIFO): "${gestor.colaDespacho.verSiguiente()?.nombre}"\n`);

// ─────────────────────────────────────────────
// FASE 5 — Reporte ordenado
// ─────────────────────────────────────────────
console.log("─".repeat(60));
console.log(" FASE 5 — REPORTE ORDENADO POR COSTO");
console.log("─".repeat(60));

const activos   = gestor.colaDespacho.paquetes;
const ordenados = OrdenamientoEnvios.mergeSort([...activos]);

console.log(`\n   Top 10 paquetes más económicos:`);
ordenados.slice(0, 10).forEach((p, i) => {
    console.log(`   ${String(i + 1).padStart(2)}. ${p.nombre.padEnd(25)} | ${p.destino.padEnd(22)} | $${p.costo}`);
});

console.log(`\n   Top 10 paquetes más costosos:`);
ordenados.slice(-10).reverse().forEach((p, i) => {
    console.log(`   ${String(i + 1).padStart(2)}. ${p.nombre.padEnd(25)} | ${p.destino.padEnd(22)} | $${p.costo}`);
});

const costoActivos = RastreoRecursivo.calcularCostoTotal(activos);
console.log(`\n    Costo total de envíos pendientes: $${costoActivos.toFixed(2)}\n`);

// ─────────────────────────────────────────────
// FASE 6 — Rastreo recursivo en historial
// ─────────────────────────────────────────────
console.log("─".repeat(60));
console.log(" FASE 6 — RASTREO RECURSIVO EN HISTORIAL");
console.log("─".repeat(60));

console.log(`\n   Total paquetes en historial: ${gestor.historial.length.toLocaleString()}\n`);

console.log("   Buscando IDs existentes:");
gestor.rastrearPaquete(1);
gestor.rastrearPaquete(100);
gestor.rastrearPaquete(5000);

console.log("\n   Buscando ID inexistente:");
gestor.rastrearPaquete(99999);

const costoHistorial = RastreoRecursivo.calcularCostoTotal(gestor.historial);
console.log(`\n    Costo total ya cobrado: $${costoHistorial.toFixed(2)}\n`);

// ─────────────────────────────────────────────
// FASE 7 — Procesamiento recursivo total
// ─────────────────────────────────────────────
console.log("─".repeat(60));
console.log(" FASE 7 — PROCESAMIENTO RECURSIVO TOTAL");
console.log("─".repeat(60));
console.log("\n   Procesando todos los paquetes restantes de forma recursiva...");

silenciar();
gestor.procesarTodo();
restaurar();

console.log("✅ Todos los paquetes han sido procesados.\n");

// ─────────────────────────────────────────────
// FASE 8 — Estado final
// ─────────────────────────────────────────────
console.log("─".repeat(60));
console.log(" FASE 8 — ESTADO FINAL DEL SISTEMA");
console.log("─".repeat(60));

gestor.mostrarEstado();
console.log(`   Puntero inicio final : ${gestor.colaDespacho.inicio.toLocaleString()}`);
console.log(`   Puntero fin final    : ${gestor.colaDespacho.fin.toLocaleString()}`);
console.log(`   Cola vacía           : ${gestor.colaDespacho.estaVacia()}`);
console.log(`   Pila vacía           : ${gestor.pilaUrgente.estaVacia()}`);

const costoFinal = RastreoRecursivo.calcularCostoTotal(gestor.historial);
console.log(`\n    Costo total de todas las entregas: $${costoFinal.toFixed(2)}`);
console.log("\n" + "═".repeat(60));
console.log("   SISTEMA FINALIZADO CORRECTAMENTE");
console.log("═".repeat(60));