package Unidad02.APE07;

import java.util.Arrays;
import java.util.Random;

public class Main {
     
     public static void main(String[] args) {

        // ── Generar 10,000 paquetes con IDs aleatorios ─────────────
        Paquete[] paquetes = new Paquete[10000];
        Random rnd = new Random();
        for (int i = 0; i < 10000; i++) {
            paquetes[i] = new Paquete(rnd.nextInt(100000), rnd.nextInt(99999) + 10000);
        }

        int idObjetivo = paquetes[9999].getId(); // peor caso para búsqueda lineal
        System.out.println("ID objetivo: " + idObjetivo);
        System.out.println("Total paquetes: 10,000\n");

        // ── Búsqueda lineal ─────────────────────────────────────────
        long inicio = System.nanoTime();
        int resultadoLineal = CentroOperaciones.buscarLineal(paquetes, idObjetivo);
        double tiempoLineal = (System.nanoTime() - inicio) / 1e9;

        System.out.println("=== Búsqueda Lineal ===");
        System.out.println("Índice encontrado : " + resultadoLineal);
        System.out.printf("Tiempo            : %.6f s%n%n", tiempoLineal);

        // ── Ordenamiento + Búsqueda binaria ─────────────────────────
        inicio = System.nanoTime();
        Arrays.sort(paquetes, (a, b) -> Integer.compare(a.getId(), b.getId()));
        double tiempoSort = (System.nanoTime() - inicio) / 1e9;

        inicio = System.nanoTime();
        int resultadoBinario = CentroOperaciones.buscarBinario(paquetes, idObjetivo);
        double tiempoBinario = (System.nanoTime() - inicio) / 1e9;

        System.out.println("=== Búsqueda Binaria ===");
        System.out.println("Índice encontrado : " + resultadoBinario);
        System.out.printf("Tiempo ordenamiento    : %.6f s%n", tiempoSort);
        System.out.printf("Tiempo sólo búsqueda   : %.8f s%n", tiempoBinario);
        System.out.printf("Tiempo total (sort+búsqueda): %.6f s%n%n", tiempoSort + tiempoBinario);

        // ── Tabla comparativa ───────────────────────────────────────
        System.out.println("=== Tabla Comparativa ===");
        System.out.printf("%-30s %-22s %-16s %s%n", "Algoritmo", "Complejidad", "Requiere orden", "Tiempo (s)");
        System.out.println("-".repeat(90));
        System.out.printf("%-30s %-22s %-16s %.6f%n", "Lineal",                   "O(n)",                  "No", tiempoLineal);
        System.out.printf("%-30s %-22s %-16s %.8f%n", "Binaria (sólo búsqueda)", "O(log n)",              "Sí", tiempoBinario);
        System.out.printf("%-30s %-22s %-16s %.6f%n", "Binaria (sort+búsqueda)", "O(n log n) + O(log n)", "Sí", tiempoSort + tiempoBinario);
    }
}
