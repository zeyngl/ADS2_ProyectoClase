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
public class StartState implements State{

    @Override
    public void doAction(Product product) {
        System.out.println("Recolectando materiales para construir articulo " + product.toString());
        product.setState(this);
    }
    
    @Override
    public String toString(){
        return "Fase de inicio";
    }
}
