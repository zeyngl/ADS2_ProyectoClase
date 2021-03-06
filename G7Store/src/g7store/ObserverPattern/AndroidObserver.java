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
public class AndroidObserver extends Observer{

    public AndroidObserver(Product subject) {
        this.subject = subject;
        subject.attach(this);
    }
    
    @Override
    public void update() {
        System.out.println("**Notificacion Movil** El producto "+ subject.toString()+ " ha pasado al "+subject.getState().toString());
    }
    
}
