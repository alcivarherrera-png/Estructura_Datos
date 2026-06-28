class Paquete {
    constructor(id, nombre, peso, destino, urgente = false) {
        this.id       = id;
        this.nombre   = nombre;
        this.peso     = peso;
        this.destino  = destino;
        this.urgente  = urgente;
        this.estado   = "pendiente";
        this.costo    = +(peso * 0.5).toFixed(2);
    }
}

module.exports = { Paquete }; 