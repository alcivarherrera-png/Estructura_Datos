// ============================================================
// Estructura del Nodo AVL para el registro energético
// ============================================================
class NodoAVL {
    constructor(idSensor, lectura) {
        this.idSensor  = idSensor;
        this.lectura   = lectura;
        this.altura    = 1;       // nodo hoja = altura 1
        this.izquierdo = null;
        this.derecho   = null;
    }
}

// ============================================================
// TDA Árbol AVL para sensores de la Smart Grid
// ============================================================
class ArbolAVLSensores {
    constructor() {
        this.raiz = null;
    }

    // --- Utilidades ---

    // Retorna la altura de un nodo; 0 si es null (seguro contra null)
    getAltura(nodo) {
        if (nodo === null) return 0;
        return nodo.altura;
    }

    // Factor de Equilibrio = altura(derecho) − altura(izquierdo)
    getBalance(nodo) {
        if (nodo === null) return 0;
        return this.getAltura(nodo.derecho) - this.getAltura(nodo.izquierdo);
    }

    // --- Rotaciones ---

    // Rotación Simple a la DERECHA (caso LL)
    rotacionDerecha(y) {
        let x  = y.izquierdo;
        let T2 = x.derecho;

        // Rotación
        x.derecho   = y;
        y.izquierdo = T2;

        // Actualizar alturas: primero y (subárbol más bajo), luego x
        y.altura = Math.max(this.getAltura(y.izquierdo),
                            this.getAltura(y.derecho)) + 1;
        x.altura = Math.max(this.getAltura(x.izquierdo),
                            this.getAltura(x.derecho)) + 1;

        return x; // nueva raíz del subárbol
    }

    // Rotación Simple a la IZQUIERDA (caso RR)
    rotacionIzquierda(x) {
        let y  = x.derecho;
        let T2 = y.izquierdo;

        // Rotación
        y.izquierdo = x;
        x.derecho   = T2;

        // Actualizar alturas: primero x (subárbol más bajo), luego y
        x.altura = Math.max(this.getAltura(x.izquierdo),
                            this.getAltura(x.derecho)) + 1;
        y.altura = Math.max(this.getAltura(y.izquierdo),
                            this.getAltura(y.derecho)) + 1;

        return y; // nueva raíz del subárbol
    }

    // --- Inserción con auto-balanceo ---

    // Método público: inserta (idSensor, lectura) en el árbol
    insertar(idSensor, lectura) {
        this.raiz = this._insertar(this.raiz, idSensor, lectura);
    }

    // Método privado recursivo
    _insertar(nodo, idSensor, lectura) {
        // 1. Inserción BST normal
        if (nodo === null) return new NodoAVL(idSensor, lectura);

        if (idSensor < nodo.idSensor) {
            nodo.izquierdo = this._insertar(nodo.izquierdo, idSensor, lectura);
        } else if (idSensor > nodo.idSensor) {
            nodo.derecho = this._insertar(nodo.derecho, idSensor, lectura);
        } else {
            // ID duplicado: actualizar lectura y retornar
            nodo.lectura = lectura;
            return nodo;
        }

        // 2. Actualizar la altura del nodo actual
        nodo.altura = Math.max(this.getAltura(nodo.izquierdo),
                               this.getAltura(nodo.derecho)) + 1;

        // 3. Calcular el Factor de Equilibrio
        const balance = this.getBalance(nodo);

        // ---- 4. Detectar desbalance y aplicar la rotación correcta ----

        // Caso LL (desbalance izquierdo-izquierdo) → Rotación Derecha
        if (balance < -1 && idSensor < nodo.izquierdo.idSensor) {
            return this.rotacionDerecha(nodo);
        }

        // Caso RR (desbalance derecho-derecho) → Rotación Izquierda
        if (balance > 1 && idSensor > nodo.derecho.idSensor) {
            return this.rotacionIzquierda(nodo);
        }

        // Caso LR (desbalance izquierdo-derecho) → Rot. Izq. + Rot. Der.
        if (balance < -1 && idSensor > nodo.izquierdo.idSensor) {
            nodo.izquierdo = this.rotacionIzquierda(nodo.izquierdo);
            return this.rotacionDerecha(nodo);
        }

        // Caso RL (desbalance derecho-izquierdo) → Rot. Der. + Rot. Izq.
        if (balance > 1 && idSensor < nodo.derecho.idSensor) {
            nodo.derecho = this.rotacionDerecha(nodo.derecho);
            return this.rotacionIzquierda(nodo);
        }

        // Sin desbalance: retornar el nodo sin cambios
        return nodo;
    }

    // --- Búsqueda (necesaria para la Tarea 3) ---

    buscar(idSensor) {
        return this._buscar(this.raiz, idSensor);
    }

    _buscar(nodo, idSensor) {
        if (nodo === null) return null;
        if (idSensor === nodo.idSensor) return nodo;
        if (idSensor < nodo.idSensor)
            return this._buscar(nodo.izquierdo, idSensor);
        return this._buscar(nodo.derecho, idSensor);
    }
}