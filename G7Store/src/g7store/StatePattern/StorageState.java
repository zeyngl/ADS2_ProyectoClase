package g7store.StatePattern;

import g7store.Factory.Product;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author luisf
 */
public class StorageState implements State{

    @Override
    public void doAction(Product product) {
        System.out.println("Articulo " + product.toString() + " terminado. Se esta almacenando en la bodega");
        product.setState(this);
    }
    
    @Override
    public String toString(){
        return "Fase de almacenaje";
    }
    
}
