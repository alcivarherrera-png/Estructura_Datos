package Unidad02.APE07;

public class GestorRutas {
   
    public static void ordenar(Paquete[] datos) {
        int n = datos.length;
        for (int i = 0; i < n - 1; i++) {
            boolean huboIntercambio = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (datos[j].getCodigoPostal() > datos[j + 1
                        ].getCodigoPostal()) {
                    Paquete temp = datos[j];
                    datos[j] = datos[j + 1];
                    datos[j + 1] = temp;
                    huboIntercambio = true;
                }
            }
            if (!huboIntercambio) break;
        }
    }
}


