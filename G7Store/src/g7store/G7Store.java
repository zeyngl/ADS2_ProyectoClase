/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package g7store;

import g7store.Factory.Product;
import g7store.Factory.ProductFactory;
import g7store.ObserverPattern.AndroidObserver;
import g7store.ObserverPattern.Observer;
import g7store.ObserverPattern.WebObserver;
import g7store.StatePattern.ProductionState;
import g7store.StatePattern.StartState;
import g7store.StatePattern.State;
import g7store.StatePattern.StorageState;
import g7store.StatePattern.TransportStage;

/**
 *
 * @author luisf
 */
public class G7Store {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        ProductFactory factory = new ProductFactory();
        
        Product p1 = factory.getProduct("HOODIE"),
                p2 = factory.getProduct("SHOES");        
        
        State startState = new StartState(),
                productionState = new ProductionState(),
                storageState = new StorageState(),
                transportState = new TransportStage();
        
        Observer webObserver = new WebObserver(p1),
                andrObserver = new AndroidObserver(p1);
        
        startState.doAction(p1);        
        productionState.doAction(p1);        
        storageState.doAction(p1);        
        transportState.doAction(p1);
        p1.show();
        
        startState.doAction(p2);
        productionState.doAction(p2);
        storageState.doAction(p2);
        transportState.doAction(p2);
        p2.show();
              
                
    }
    
}
