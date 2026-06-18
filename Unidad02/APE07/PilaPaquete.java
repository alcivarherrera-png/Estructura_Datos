package Unidad02.APE07;

public class PilaPaquete {
    
     private Paquete[] stack;
    private int top;

    public PilaPaquete() {
        this.stack = new Paquete[10];
        this.top = -1;
    }

    public PilaPaquete(int capacidad) {
        this.stack = new Paquete[capacidad];
        this.top = -1;
    }

    public void push(Paquete p) {
        if (p == null) return;
        if (estaLlena()) {
            System.out.println("Pila llena. No se puede agregar el paquete ID: " + p.getId());
            return;
        }
        this.stack[++this.top] = p;
    }

    public Paquete pop() {
        if (estaVacia()) {
            System.out.println("Pila vacia. No hay paquetes para despachar.");
            return null;
        }
        Paquete p = this.stack[this.top];
        this.stack[this.top] = null; // liberar referencia
        this.top--;
        return p;
    }

    // Devuelve el paquete en la cima sin eliminarlo.
    // Util para consultar cual seria el proximo en despacharse.
    // Complejidad: O(1).
    public Paquete peek() {
        if (estaVacia()) return null;
        return this.stack[this.top];
    }

    // Retorna true si la pila no tiene ningun paquete.
    public boolean estaVacia() {
        return this.top == -1;
    }

    // Retorna true si la pila alcanzo su capacidad maxima.
    public boolean estaLlena() {
        return this.top == this.stack.length - 1;
    }

    // Cantidad de paquetes actualmente en la pila.
    public int tamano() {
        return this.top + 1;
    }

    @Override
    public String toString() {
        if (estaVacia()) return "PilaPaquete []";
        StringBuilder sb = new StringBuilder("PilaPaquete [cima -> ");
        for (int i = this.top; i >= 0; i--) {
            sb.append("ID:").append(this.stack[i].getId())
                    .append(" CP:").append(this.stack[i].getCodigoPostal());
            if (i > 0) sb.append(" | ");
        }
        sb.append("]");
        return sb.toString();
    }
}
