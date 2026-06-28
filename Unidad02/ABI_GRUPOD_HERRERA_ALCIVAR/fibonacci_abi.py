"""
ABI - Memoizacion y Tablas Hash
Comparacion: Fuerza Bruta vs Memoizacion con dict (HashMap)
Algoritmo: Serie de Fibonacci
"""

import sys
sys.stdout.reconfigure(encoding='utf-8')

import time
import matplotlib.pyplot as plt

# ============================================================
# ENFOQUE A: FUERZA BRUTA RECURSIVA
# Complejidad: O(2^n) tiempo | O(n) espacio (pila de llamadas)
# ============================================================

def fibonacci_bruta(n):
    """
    Calcula F(n) mediante recursion pura sin almacenamiento.
    Cada llamada genera dos ramas adicionales, reprocesando
    subproblemas identicos de forma exponencial.

    Args:
        n (int): Indice del numero de Fibonacci a calcular.
    Returns:
        int: El n-esimo numero de Fibonacci.
    """
    # Caso base: F(0) = 0, F(1) = 1
    if n <= 1:
        return n
    # Ramificacion exponencial: recalcula subproblemas ya resueltos
    return fibonacci_bruta(n - 1) + fibonacci_bruta(n - 2)


# ============================================================
# ENFOQUE B: MEMOIZACION CON TABLA HASH (dict)
# Complejidad: O(n) tiempo | O(n) espacio (cache hash)
# ============================================================

def fibonacci_memo(n, cache=None):
    """
    Calcula F(n) con memoizacion usando un diccionario hash como cache.
    Antes de calcular, intercepta si el subproblema ya fue resuelto.
    Si existe en el cache (O(1) lookup), retorna el valor directamente.
    Si no existe, lo calcula, lo guarda, y retorna el resultado.

    Args:
        n (int): Indice del numero de Fibonacci a calcular.
        cache (dict): Tabla hash que almacena subproblemas ya resueltos.
                      Actua como memoria intermedia (short-term cache).
    Returns:
        int: El n-esimo numero de Fibonacci.
    """
    # Inicializar el diccionario hash en la primera llamada
    if cache is None:
        cache = {}

    # Caso base: F(0) = 0, F(1) = 1 (no requieren almacenamiento)
    if n <= 1:
        return n

    # INTERCEPCION: verificar si el subproblema F(n) ya esta en la cache
    # Operacion de busqueda en tabla hash: O(1) amortizado
    if n in cache:
        return cache[n]  # Recuperacion directa sin recalcular: evita ALU cycles

    # Subproblema nuevo: calcular y almacenar en la tabla hash
    # La insercion en el dict tambien es O(1) amortizado
    resultado = fibonacci_memo(n - 1, cache) + fibonacci_memo(n - 2, cache)
    cache[n] = resultado  # Guardar en tabla hash para futuras consultas

    return resultado


# ============================================================
# PROTOCOLO DE MEDICION CON PRECISION DE NANOSEGUNDOS
# ============================================================

def medir_latencia(func, n, repeticiones=5, **kwargs):
    """
    Mide la latencia promedio de una funcion en nanosegundos.
    Ejecuta la funcion multiples veces para reducir el ruido del scheduler.

    Args:
        func: Funcion a medir (fibonacci_bruta o fibonacci_memo).
        n (int): Tamano de entrada N para el experimento.
        repeticiones (int): Numero de ejecuciones para promediar.
        **kwargs: Argumentos adicionales para la funcion (ej. cache={}).
    Returns:
        float: Latencia promedio en nanosegundos.
    """
    tiempos = []
    for _ in range(repeticiones):
        inicio = time.perf_counter_ns()   # Marca de tiempo en nanosegundos
        func(n, **kwargs)
        fin = time.perf_counter_ns()      # Fin de la medicion
        tiempos.append(fin - inicio)      # Diferencia = latencia de esta ejecucion

    # Retornar el promedio de todas las mediciones para minimizar outliers
    return sum(tiempos) / len(tiempos)


# ============================================================
# EXPERIMENTO COMPARATIVO
# ============================================================

def ejecutar_experimento():
    """
    Ejecuta el protocolo de medicion para ambos enfoques con
    tamanos de entrada incrementales y genera la grafica comparativa.
    """
    # Aumentar limite de recursion para valores altos de N
    sys.setrecursionlimit(10000)

    # Tamanos de entrada para el experimento
    # Se limita la fuerza bruta a N=35 para evitar tiempos de espera excesivos
    valores_n_bruta = [10, 15, 20, 25, 30, 35]
    valores_n_memo  = [10, 15, 20, 25, 30, 35, 40, 45, 50]

    latencias_bruta = []
    latencias_memo  = []

    print("=" * 65)
    print("   ABI - Comparativa: Fuerza Bruta vs Memoizacion (Fibonacci)")
    print("=" * 65)
    print(f"\n{'N':>5} | {'Fuerza Bruta (ns)':>22} | {'Memoizacion (ns)':>20}")
    print("-" * 55)

    # --- Medir Enfoque A: Fuerza Bruta ---
    for n in valores_n_bruta:
        # Sin argumentos extra; usa recursion pura sin cache
        lat = medir_latencia(fibonacci_bruta, n)
        latencias_bruta.append(lat)
        print(f"{n:>5} | {lat:>22,.0f} | {'(ver columna memo)':>20}")

    print()

    # --- Medir Enfoque B: Memoizacion ---
    for n in valores_n_memo:
        # Se pasa un cache vacio nuevo en cada medicion para aislar el experimento
        lat = medir_latencia(fibonacci_memo, n, cache={})
        latencias_memo.append(lat)

    # Imprimir tabla completa de memoizacion
    print(f"\n{'N':>5} | {'Memoizacion (ns)':>22}")
    print("-" * 32)
    for n, lat in zip(valores_n_memo, latencias_memo):
        print(f"{n:>5} | {lat:>22,.0f}")

    print("=" * 65)

    # ============================================================
    # GENERACION DE GRAFICA COMPARATIVA
    # ============================================================
    fig, axes = plt.subplots(1, 2, figsize=(14, 6))
    fig.suptitle(
        "ABI - Memoizacion vs Fuerza Bruta: Fibonacci\n"
        "Tamano de Entrada (N) vs Latencia de Ejecucion (ns)",
        fontsize=13, fontweight='bold'
    )

    # --- Grafica 1: Escala normal (muestra el colapso exponencial) ---
    ax1 = axes[0]
    ax1.plot(
        valores_n_bruta, latencias_bruta,
        color='crimson', marker='o', linewidth=2.5,
        label='Fuerza Bruta O(2^n)', markersize=7
    )
    ax1.plot(
        valores_n_bruta, latencias_memo[:len(valores_n_bruta)],
        color='steelblue', marker='s', linewidth=2.5,
        label='Memoizacion O(n)', markersize=7
    )
    ax1.set_title("Escala Lineal - Colapso Exponencial")
    ax1.set_xlabel("Tamano de Entrada (N)")
    ax1.set_ylabel("Latencia (nanosegundos)")
    ax1.legend()
    ax1.grid(True, alpha=0.3)
    ax1.fill_between(valores_n_bruta, latencias_bruta, alpha=0.1, color='crimson')

    # --- Grafica 2: Escala logaritmica (permite ver ambas curvas) ---
    ax2 = axes[1]
    ax2.semilogy(
        valores_n_bruta, latencias_bruta,
        color='crimson', marker='o', linewidth=2.5,
        label='Fuerza Bruta O(2^n)', markersize=7
    )
    ax2.semilogy(
        valores_n_memo, latencias_memo,
        color='steelblue', marker='s', linewidth=2.5,
        label='Memoizacion O(n)', markersize=7
    )
    ax2.set_title("Escala Logaritmica - Comparativa Completa")
    ax2.set_xlabel("Tamano de Entrada (N)")
    ax2.set_ylabel("Latencia (ns) - Escala Log")
    ax2.legend()
    ax2.grid(True, alpha=0.3, which='both')

    plt.tight_layout()

    # Guardar la grafica como archivo PNG
    nombre_grafica = "grafica_comparativa_abi.png"
    plt.savefig(nombre_grafica, dpi=150, bbox_inches='tight')
    print(f"\nGrafica guardada como: {nombre_grafica}")
    plt.show()

    return valores_n_bruta, latencias_bruta, valores_n_memo, latencias_memo


# ============================================================
# PUNTO DE ENTRADA PRINCIPAL
# ============================================================

if __name__ == "__main__":
    ejecutar_experimento()