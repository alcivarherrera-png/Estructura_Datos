package Unidad02.APE07;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Queue;

public class CentroOperaciones {
    private ArrayList<Paquete> inventario;
    private Queue<Paquete> cola;

    public CentroOperaciones() {
        this.inventario = new ArrayList<>();
        this.cola = new LinkedList<>();
    }

    // ── Búsqueda lineal ────────────────────────────────────────────
    public static int buscarLineal(Paquete[] lista, int id) {
        for (int i = 0; i < lista.length; i++) {
            if (lista[i].getId() == id) return i;
        }
        return -1;
    }

    // ── Validación de orden (auxiliar para búsqueda binaria) ───────
    private static boolean estaOrdenada(Paquete[] lista) {
        for (int i = 0; i < lista.length - 1; i++) {
            if (lista[i].getId() > lista[i + 1].getId()) return false;
        }
        return true;
    }

    // ── Búsqueda binaria ───────────────────────────────────────────
    public static int buscarBinario(Paquete[] lista, int id) {
        if (!estaOrdenada(lista)) {
            throw new IllegalArgumentException(
                "buscarBinario requiere que la lista esté ordenada por id (ascendente)."
            );
        }

        int bajo = 0, alto = lista.length - 1;
        while (bajo <= alto) {
            int medio = bajo + (alto - bajo) / 2;
            if (lista[medio].getId() == id) return medio;
            if (lista[medio].getId() < id) bajo = medio + 1;
            else alto = medio - 1;
        }
        return -1;
    }

    public void recibirCajaCamion(Paquete p) {
        if (p != null) {
            this.inventario.add(p);
        }
    }

    public Paquete despacharACliente() {
        if (!this.cola.isEmpty()) {
            return this.cola.poll();
        }
        return null;
    }

    public Paquete enviarPaquetesFIFO() {
        int n = this.inventario.size();
        if (n <= 100_000) {
            ordenarQuickSort(0, n - 1);
        } else {
            ordenarMergeSort(0, n - 1);
        }
        for (Paquete p : this.inventario) {
            cola.add(p);
        }
        this.inventario.clear();
        return despacharACliente();
    }

    public void ordenarRutaBurbuja() {
        int n = this.inventario.size();
        for (int i = 0; i < n - 1; i++) {
            boolean huboIntercambio = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (this.inventario.get(j).getCodigoPostal() >
                        this.inventario.get(j + 1).getCodigoPostal()) {
                    intercambio(j, j + 1);
                    huboIntercambio = true;
                }
            }
            if (!huboIntercambio) break;
        }
    }

    public void ordenarMergeSort(int izq, int der) {
        if (izq < der) {
            int medio = izq + (der - izq) / 2;
            ordenarMergeSort(izq, medio);
            ordenarMergeSort(medio + 1, der);
            merge(izq, medio, der);
        }
    }

    private void merge(int izq, int medio, int der) {
        int n1 = medio - izq + 1;
        int n2 = der - medio;

        ArrayList<Paquete> L = new ArrayList<>(n1);
        ArrayList<Paquete> R = new ArrayList<>(n2);

        for (int i = 0; i < n1; i++) L.add(this.inventario.get(izq + i));
        for (int j = 0; j < n2; j++) R.add(this.inventario.get(medio + 1 + j));

        int i = 0, j = 0, k = izq;
        while (i < n1 && j < n2) {
            if (L.get(i).getCodigoPostal() <= R.get(j).getCodigoPostal()) {
                this.inventario.set(k++, L.get(i++));
            } else {
                this.inventario.set(k++, R.get(j++));
            }
        }
        while (i < n1) this.inventario.set(k++, L.get(i++));
        while (j < n2) this.inventario.set(k++, R.get(j++));
    }

    public void ordenarQuickSort(int bajo, int alto) {
        if (bajo < alto) {
            int pi = particion(bajo, alto);
            ordenarQuickSort(bajo, pi - 1);
            ordenarQuickSort(pi + 1, alto);
        }
    }

    private int particion(int bajo, int alto) {
        // Pivote mediana-de-tres: reduce el riesgo de degradar a O(n^2)
        int medio = bajo + (alto - bajo) / 2;
        if (inventario.get(bajo).getCodigoPostal() > inventario.get(medio).getCodigoPostal()) intercambio(bajo, medio);
        if (inventario.get(bajo).getCodigoPostal() > inventario.get(alto).getCodigoPostal()) intercambio(bajo, alto);
        if (inventario.get(medio).getCodigoPostal() > inventario.get(alto).getCodigoPostal()) intercambio(medio, alto);
        intercambio(medio, alto);

        int pivotCP = this.inventario.get(alto).getCodigoPostal();
        int i = bajo - 1;
        for (int j = bajo; j < alto; j++) {
            if (this.inventario.get(j).getCodigoPostal() <= pivotCP) {
                intercambio(++i, j);
            }
        }
        intercambio(i + 1, alto);
        return i + 1;
    }

    private void intercambio(int i, int j) {
        Paquete tmp = this.inventario.get(i);
        this.inventario.set(i, this.inventario.get(j));
        this.inventario.set(j, tmp);
    }

    public int tamano() {
        return this.inventario.size();
    }

    public Paquete getPaquete(int i) {
        return this.inventario.get(i);
    }

}
