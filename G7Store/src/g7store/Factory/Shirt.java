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
public class Shirt extends Product {

    public Shirt() {
        
    }    

    @Override
    public void show() {
        System.out.println("Soy una camisa");
    }
    
    @Override
    public String toString(){
        return "Cam-" + this.hashCode() ;
    }
    
}
