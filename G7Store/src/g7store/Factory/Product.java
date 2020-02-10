/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package g7store.Factory;

import g7store.ObserverPattern.Observer;
import g7store.StatePattern.State;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author luisf
 */
public abstract class Product {

    private State state;
    private List<Observer> observers = new ArrayList<Observer>();

    public abstract void show(); //Metodo abstracto

    public void attach(Observer observer) {
        observers.add(observer);
    }

    private void notifyAllObservers() {
        for (Observer observer : observers) {
            observer.update();
        }
    }

    public void setState(State state) {
        this.state = state;
        notifyAllObservers();
    }

    public State getState() {
        return state;
    }

}
