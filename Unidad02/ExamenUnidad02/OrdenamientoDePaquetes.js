const OrdenamientoEnvios = {

    mergeSort(paquetes) {
        if (paquetes.length <= 1) return paquetes;

        const mitad     = Math.floor(paquetes.length / 2);
        const izquierda = this.mergeSort(paquetes.slice(0, mitad));
        const derecha   = this.mergeSort(paquetes.slice(mitad));

        return this._merge(izquierda, derecha);
    },

    _merge(izq, der) {
        const resultado = [];
        let i = 0, j = 0;

        while (i < izq.length && j < der.length) {
            if (izq[i].costo <= der[j].costo) {
                resultado.push(izq[i++]);
            } else {
                resultado.push(der[j++]);
            }
        }

        return resultado.concat(izq.slice(i)).concat(der.slice(j));
    },

    mostrarOrdenados(paquetes) {
        console.log("\n📋 Paquetes ordenados por costo de envío (menor a mayor):");
        paquetes.forEach((p, i) => {
            console.log(`  ${i + 1}. ${p.nombre.padEnd(15)} | Destino: ${p.destino.padEnd(20)} | Costo: $${p.costo}`);
        });
        console.log();
    }
};

module.exports = OrdenamientoEnvios;