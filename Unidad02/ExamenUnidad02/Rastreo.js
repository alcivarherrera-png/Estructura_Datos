const RastreoRecursivo = {

    buscarPorId(lista, id, indice = 0) {
        if (indice >= lista.length) return null;
        if (lista[indice].id === id) return lista[indice];
        return this.buscarPorId(lista, id, indice + 1);
    },

    calcularCostoTotal(lista, indice = 0, total = 0) {
        if (indice >= lista.length) return total;
        return this.calcularCostoTotal(lista, indice + 1, total + lista[indice].costo);
    },

    contarPorEstado(lista, estado, indice = 0, conteo = 0) {
        if (indice >= lista.length) return conteo;
        const nuevo = lista[indice].estado === estado ? conteo + 1 : conteo;
        return this.contarPorEstado(lista, estado, indice + 1, nuevo);
    }
};

module.exports = RastreoRecursivo;