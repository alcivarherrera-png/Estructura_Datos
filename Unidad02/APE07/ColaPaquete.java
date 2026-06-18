package Unidad02.APE07;

public class ColaPaquete {
    
    private Paquete[] queue;
    private int frente, fin, total;

    public ColaPaquete(int capacidad) {
        this.queue = new Paquete[capacidad];
        this.frente = 0;
        this.fin = 0;
        this.total = 0;
    }

    public void enqueue(Paquete p) {
        if (p == null) return;
        if (estaLlena()) {
            System.out.println("Cola llena. No se puede agregar el paquete ID: " + p.getId());
            return;
        }
        this.queue[this.fin] = p;
        this.fin = (this.fin + 1) % this.queue.length;
        this.total++;
    }

    public Paquete dequeue() {
        if (estaVacia()) {
            System.out.println("Cola vacia. No hay paquetes para despachar.");
            return null;
        }
        Paquete p = this.queue[this.frente];
        this.queue[this.frente] = null; // liberar referencia
        this.frente = (this.frente + 1) % this.queue.length;
        this.total--;
        return p;
    }

    // Devuelve el paquete en el frente sin eliminarlo. .
    public Paquete peek() {
        if (estaVacia()) return null;
        return this.queue[this.frente];
    }

    public boolean estaVacia() {
        return this.total == 0;
    }

    public boolean estaLlena() {
        return this.total == this.queue.length;
    }

    public int tamano() {
        return this.total;
    }

    @Override
    public String toString() {
        if (estaVacia()) return "ColaPaquetes []";
        StringBuilder sb = new StringBuilder("ColaPaquetes [frente -> ");
        for (int i = 0; i < this.total; i++) {
            int idx = (this.frente + i) % this.queue.length;
            sb.append("ID:").append(this.queue[idx].getId())
                    .append(" CP:").append(this.queue[idx].getCodigoPostal());
            if (i < this.total - 1) sb.append(" | ");
        }
        sb.append(" <- fin]");
        return sb.toString();
    }
}
