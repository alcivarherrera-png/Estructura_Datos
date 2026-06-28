const { Paquete }          = require("./Paquete");
const { ColaDespacho,
        PilaEnvioUrgente } = require("./Envios");
const OrdenamientoEnvios   = require("./OrdenamientoDePaquetes");
const RastreoRecursivo     = require("./Rastreo");

class GestorDeEntregas {
    constructor() {
        this.colaDespacho = new ColaDespacho();
        this.pilaUrgente  = new PilaEnvioUrgente();
        this.historial    = [];
        this.contador     = 1;
    }

    registrarPaquete(nombre, peso, destino, urgente = false) {
        const paquete = new Paquete(this.contador++, nombre, peso, destino, urgente); // ← corregido

        if (urgente) {
            this.pilaUrgente.apilar(paquete);
        } else {
            this.colaDespacho.encolar(paquete);
        }

        return paquete;
    }

    procesarEntrega() {
        let paquete = null;

        if (!this.pilaUrgente.estaVacia()) {
            paquete = this.pilaUrgente.desapilar();
        } else if (!this.colaDespacho.estaVacia()) {
            paquete = this.colaDespacho.desencolar();
        } else {
            console.log(" No hay paquetes pendientes por despachar.");
            return null;
        }

        paquete.estado = "entregado";
        this.historial.push(paquete);
        return paquete;
    }

    procesarTodo(entregados = []) {
        if (this.pilaUrgente.estaVacia() && this.colaDespacho.estaVacia()) {
            console.log(`\n Todos los despachos completados. Total entregado: ${entregados.length} paquete(s).`);
            return entregados;
        }
        const paquete = this.procesarEntrega();
        if (paquete) entregados.push(paquete);
        return this.procesarTodo(entregados);
    }

    rastrearPaquete(id) {
        const encontrado = RastreoRecursivo.buscarPorId(this.historial, id);
        if (encontrado) {
            console.log(` Paquete encontrado: "${encontrado.nombre}" — Estado: ${encontrado.estado}`);
        } else {
            console.log(` No se encontró ningún paquete con ID ${id} en el historial.`);
        }
        return encontrado;
    }

    mostrarReporteOrdenado() {
        const todos     = [...this.colaDespacho.paquetes, ...this.pilaUrgente.paquetes];
        const ordenados = OrdenamientoEnvios.mergeSort(todos);
        OrdenamientoEnvios.mostrarOrdenados(ordenados);

        const costoTotal = RastreoRecursivo.calcularCostoTotal(todos);
        console.log(` Costo total de envíos pendientes: $${costoTotal.toFixed(2)}\n`);
    }

    mostrarEstado() {
        const entregados = RastreoRecursivo.contarPorEstado(this.historial, "entregado");
        console.log(" --- ESTADO DEL SISTEMA DE ENTREGAS ---");
        console.log(`   Cola de despacho  (FIFO): ${this.colaDespacho.paquetes.length} paquete(s)`);
        console.log(`   Pila urgente      (LIFO): ${this.pilaUrgente.paquetes.length} paquete(s)`);
        console.log(`   Entregados:               ${entregados} paquete(s)`);
        console.log("-----------------------------------------\n");
    }
}

module.exports = GestorDeEntregas;