class GestorRegistrosVerdes {

    mergeSort(arreglo, inicio, fin) {

        if (inicio < fin) {
            const medio = Math.floor(inicio + (fin - inicio) / 2);
            this.mergeSort(arreglo, inicio, medio);

            this.mergeSort(arreglo, medio + 1, fin);

            this.merge(arreglo,inicio, medio,fin);
        }
    }

    merge(arreglo, inicio, medio, fin) {
        const tamIzq = medio - inicio + 1;
        const tamDer = fin - medio;

        const izquierdo = [];
        const derecho = [];

        for (let i = 0; i < tamIzq; i++) {
            izquierdo[i] =arreglo[inicio + i];
        }

        for (let j = 0; j < tamDer; j++) {
            derecho[j] =arreglo[medio + 1 + j];
        }

        let i = 0;
        let j = 0;
        let k = inicio;

        while (i < tamIzq &&j < tamDer) {
            if (izquierdo[i].idRegistro <=derecho[j].idRegistro) {
                arreglo[k] =izquierdo[i];
                i++;
            } else {
            arreglo[k] =derecho[j];
            j++;}
            k++;
        }

        while (i < tamIzq) {
            arreglo[k] =izquierdo[i];
            i++;
            k++;
        }

        while (j < tamDer) {
            arreglo[k] =derecho[j];
            j++;
            k++;
        }
    }

    busquedaSecuencial(arreglo,idBuscado) {
        for (let i = 0;i < arreglo.length;i++) {
            if (arreglo[i].idRegistro ===idBuscado) {
                return i;
            }
        }
        return -1;
    }

    busquedaBinaria(arreglo,idBuscado) {
        let izquierda = 0;
        let derecha =
            arreglo.length - 1;

        while (izquierda <= derecha) {
            const medio =Math.floor((izquierda + derecha) / 2);
            if (arreglo[medio].idRegistro === idBuscado) {
                return medio;
            }

            if (arreglo[medio].idRegistro < idBuscado ) {
                izquierda = medio + 1;
            } else {
                derecha = medio - 1;
            }
        }

        return -1;
    }
}

module.exports = {
    GestorRegistrosVerdes
};