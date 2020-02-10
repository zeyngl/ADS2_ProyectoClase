/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package g7store.Factory;

/**
 *
 * @author luisf
 */
public class Pants extends Product {

    public Pants() {
    }

    @Override
    public void show() {
        System.out.println("Soy un pantalon");
    }

    @Override
    public String toString(){
        return "Pant-" + this.hashCode() ;
    }
    
}
