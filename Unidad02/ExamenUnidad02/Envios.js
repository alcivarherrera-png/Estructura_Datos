class ColaDespacho {        // FIFO — Cola Circular con arreglo de tamaño fijo
    constructor() {
        this.capacidad = 25000;
        this.arreglo   = new Array(this.capacidad).fill(null);
        this.inicio    = 0;
        this.fin       = 0;
        this.tamaño    = 0;
    }

    encolar(paquete) {
        if (this.estaLlena()) {
            console.log(`⚠️  Cola llena. No se puede agregar "${paquete.nombre}".`);
            return false;
        }

        this.arreglo[this.fin] = paquete;
        this.fin = (this.fin + 1) % this.capacidad;   // puntero fin avanza circularmente
        this.tamaño++;

        console.log(`📦 Paquete "${paquete.nombre}" agregado a la cola de despacho (FIFO).`);
        return true;
    }

    desencolar() {
        if (this.estaVacia()) {
            console.log("No hay paquetes en la cola de despacho.");
            return null;
        }

        const paquete          = this.arreglo[this.inicio];
        this.arreglo[this.inicio] = null;                      // libera la posición
        this.inicio            = (this.inicio + 1) % this.capacidad;  // puntero inicio avanza circularmente
        this.tamaño--;

        console.log(`🚚 Despachando paquete normal: "${paquete.nombre}" con destino a ${paquete.destino}.`);
        return paquete;
    }

    verSiguiente() {
        if (this.estaVacia()) {
            console.log("La cola de despacho está vacía.");
            return null;
        }
        return this.arreglo[this.inicio];
    }

    estaVacia() {
        return this.tamaño === 0;
    }

    estaLlena() {
        return this.tamaño === this.capacidad;
    }

    mostrarCola() {
        if (this.estaVacia()) {
            console.log("\n Cola de despacho FIFO (0): [vacía]\n");
            return;
        }

        const elementos = [];
        for (let i = 0; i < this.tamaño; i++) {
            const indice = (this.inicio + i) % this.capacidad;
            elementos.push(this.arreglo[indice].nombre);
        }

        console.log(`\n Cola de despacho FIFO (${this.tamaño}/${this.capacidad}): [${elementos.join(" <- ")}]`);
        console.log(`   Puntero inicio: ${this.inicio} | Puntero fin: ${this.fin}\n`);
    }

    // Expone los paquetes activos para compatibilidad con el gestor
    get paquetes() {
        const elementos = [];
        for (let i = 0; i < this.tamaño; i++) {
            const indice = (this.inicio + i) % this.capacidad;
            elementos.push(this.arreglo[indice]);
        }
        return elementos;
    }
}

class PilaEnvioUrgente {    // LIFO — paquetes urgentes, el último registrado sale primero
    constructor() {
        this.paquetes = [];
    }

    apilar(paquete) {
        this.paquetes.push(paquete);
        console.log(`🔴 Paquete urgente "${paquete.nombre}" apilado en envíos urgentes (LIFO).`);
    }

    desapilar() {
        if (this.estaVacia()) {
            console.log("No hay paquetes urgentes en la pila.");
            return null;
        }
        const paquete = this.paquetes.pop();
        console.log(`🚨 Despachando paquete URGENTE: "${paquete.nombre}" con destino a ${paquete.destino}.`);
        return paquete;
    }

    verCima() {
        if (this.estaVacia()) {
            console.log("La pila de envíos urgentes está vacía.");
            return null;
        }
        return this.paquetes[this.paquetes.length - 1];
    }

    estaVacia() {
        return this.paquetes.length === 0;
    }

    mostrarPila() {
        const nombres = [...this.paquetes].reverse().map(p => p.nombre).join(" <- ");
        console.log(`\n Pila de envíos urgentes LIFO (${this.paquetes.length}): [${nombres}]\n`);
    }
}

module.exports = { ColaDespacho, PilaEnvioUrgente };