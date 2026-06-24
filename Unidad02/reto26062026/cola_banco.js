class ColaDeBanco {
    constructor() {
        this.clientes = [];
    }

    llegarCliente(nombre) {
        this.clientes.push(nombre);
        console.log(`${nombre} ha recibido un turno y se unió a la fila.`);
    }

    atenderCliente() {
        if (this.estaVacia()) {
            console.log("No hay clientes en la fila por atender.");
            return null;
        }

        const clienteAtendido = this.clientes.shift();
        console.log(`Atendiendo a: ${clienteAtendido}. Gracias por su espera!`);
        return clienteAtendido;
    }

    
    verSiguiente() {
        if (this.estaVacia()) {
            console.log("La fila está vacía.");
            return null;
        }
        return this.clientes[0];
    }

    
    estaVacia() {
        return this.clientes.length === 0;
    }

    mostrarFila() {
        console.log(`\n Fila actual (${this.clientes.length}): [${this.clientes.join(" <- ")}]\n`);
    }
}

const filaBanco = new ColaDeBanco();

console.log("--- INICIO DEL DÍA EN EL BANCO ---");
filaBanco.llegarCliente("Carlos");
filaBanco.llegarCliente("Ana");
filaBanco.llegarCliente("Mateo");

filaBanco.mostrarFila();

console.log(`El siguiente en ser atendido será: ${filaBanco.verSiguiente()}`);

filaBanco.atenderCliente();
filaBanco.mostrarFila();    

filaBanco.atenderCliente(); 
filaBanco.atenderCliente();
filaBanco.atenderCliente();