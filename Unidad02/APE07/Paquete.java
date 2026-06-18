package Unidad02.APE07;

public class Paquete {
  
    private int id;
    private int codigoPostal;

    public Paquete(int id, int codigoPostal) {
        this.id = id;
        this.codigoPostal = codigoPostal;
    }

    public Paquete() {
    }

    public int getId() {
        return id;
    }

    public int getCodigoPostal() {
        return codigoPostal;
    }

}


