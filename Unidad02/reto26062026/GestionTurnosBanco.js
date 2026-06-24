
// Estructura de Datos: Cola (Queue)

class ColaTurnos {
    constructor() {
        this.turnos = [];
    }

    agregarCliente(nombre) {
        this.turnos.push(nombre);
        console.log(`${nombre} ha tomado un turno.`);
    }

    atenderCliente() {
        if (this.turnos.length === 0) {
            console.log("No hay clientes en espera.");
            return;
        }

        const cliente = this.turnos.shift();
        console.log(`Atendiendo a: ${cliente}`);
    }

    mostrarCola() {
        console.log("Clientes en espera:");
        console.log(this.turnos);
    }
}
const banco = new ColaTurnos();

banco.agregarCliente("Juan");
banco.agregarCliente("María");
banco.agregarCliente("Pedro");

banco.mostrarCola();

banco.atenderCliente();
banco.atenderCliente();

banco.mostrarCola();