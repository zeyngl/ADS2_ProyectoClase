








/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package g7store.ObserverPattern;

import g7store.Factory.Product;

/**
 *
 * @author luisf
 */
public abstract class Observer {
    Product subject;
    public abstract void update();
    
}
