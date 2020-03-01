/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package g7store.StatePattern;

import g7store.Factory.Product;

/**
 *
 * @author luisf
 */
public class TransportStage implements State{

    @Override
    public void doAction(Product product) {
        System.out.println("El Articulo " + product.toString() + " esta siendo enviado al cliente");
        product.setState(this);
    }
    @Override
    public String toString(){
        return "Fase de trasnporte";
    }
}
