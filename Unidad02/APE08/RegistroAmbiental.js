class RegistroAmbiental {
  constructor(idRegistro, especie, toneladasCO2) {
    this.idRegistro   = idRegistro;
    this.especie      = especie;
    this.toneladasCO2 = toneladasCO2;
  }
}

// FUNCIÓN: Generación de datos con Fisher-Yates — O(n)=
function generarDatosPrueba(cantidad) {
  let datos = [];
  for (let i = 0; i < cantidad; i++) {
    let especie = `Especie_${Math.floor(Math.random() * 100)}`;
    let co2     = +(Math.random() * 100).toFixed(2);
    datos.push(new RegistroAmbiental(i, especie, co2));
  }
  for (let i = datos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [datos[i], datos[j]] = [datos[j], datos[i]];
  }
  return datos;
}

module.exports = { RegistroAmbiental, generarDatosPrueba };