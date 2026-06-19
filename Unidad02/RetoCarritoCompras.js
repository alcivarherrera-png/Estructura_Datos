// Clase Producto
class Producto {
    constructor(codigo, precio, cantidad) {
        this.codigo = codigo;
        this.precio = precio;
        this.cantidad = cantidad;
    }

    subtotal() {
        return this.precio * this.cantidad;
    }
}

// Clase Carrito
class Carrito {
    constructor() {
        this.productos = []; // Cola FIFO
    }

    // Agregar producto
    agregarProducto(producto) {
        this.productos.push(producto);
        console.log(`Producto ${producto.codigo} agregado.`);
    }

    // Quitar producto por código
    quitarProducto(codigo) {
        const indice = this.productos.findIndex(
            producto => producto.codigo === codigo
        );

        if (indice !== -1) {
            const eliminado = this.productos.splice(indice, 1);
            console.log(`Producto ${eliminado[0].codigo} eliminado.`);
        } else {
            console.log("Producto no encontrado.");
        }
    }

    // Mostrar carrito
    mostrarCarrito() {
        console.log("\n--- CARRITO ---");

        this.productos.forEach(producto => {
            console.log(
                `Código: ${producto.codigo} | Precio: $${producto.precio} | Cantidad: ${producto.cantidad}`
            );
        });
    }

    // Procesar compra usando FIFO
    procesarCompra() {
        console.log("\n--- PROCESANDO COMPRA (FIFO) ---");

        let total = 0;

        while (this.productos.length > 0) {
            const producto = this.productos.shift(); // FIFO

            console.log(
                `Procesando producto ${producto.codigo} - Subtotal: $${producto.subtotal()}`
            );

            total += producto.subtotal();
        }

        console.log(`Total de la compra: $${total}`);
    }
}

// Programa principal
const carrito = new Carrito();

carrito.agregarProducto(new Producto("P001", 10, 2));
carrito.agregarProducto(new Producto("P002", 15, 1));
carrito.agregarProducto(new Producto("P003", 20, 3));

carrito.mostrarCarrito();

carrito.quitarProducto("P002");

carrito.mostrarCarrito();

carrito.procesarCompra();