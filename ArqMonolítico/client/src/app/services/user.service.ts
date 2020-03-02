import { Injectable } from '@angular/core';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isUserLoggedIn;
  public usserLogged: User;

  constructor() {
    this.isUserLoggedIn = false;
  }

  setUserLoggedIn(user: User) {
    this.usserLogged = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getUserLoggedIn() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  logoutUser() {
    this.usserLogged = undefined;
    localStorage.removeItem('currentUser');
  }

  isLoggedIn() {
    if (localStorage.getItem('currentUser') != undefined) return true;
    return false;
  }
}
