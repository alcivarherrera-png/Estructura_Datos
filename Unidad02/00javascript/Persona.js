// Definición de la clase
class Persona {
    // Constructor
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    // Método
    saludar() {
        console.log(`Hola, me llamo ${this.nombre} y tengo ${this.edad} años.`);
    }
}

// Creación de objetos
const persona1 = new Persona("Elian", 20);
const persona2 = new Persona("María", 22);

// Uso de métodos
persona1.saludar();
persona2.saludar();