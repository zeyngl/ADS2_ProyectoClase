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
public class Shoes extends Product {

    public Shoes() {
    }

    @Override
    public void show() {
        System.out.println("Soy un par de zapatos");
    }
    
    @Override
    public String toString(){
        return "Zap-" + this.hashCode() ;
    }
}
