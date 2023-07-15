import { Injectable } from '@angular/core';

import { Subject, of } from 'rxjs';

import { User } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$ = new Subject<User>();

  constructor() {}

  login(email: string, password: string) {
    const loginCredentials = { email, password };
    console.log('login credentials: ', loginCredentials);
    return of(loginCredentials);
  }

  logout() {
    // remove user from subject
    this.setUser(null);
    console.log('user did logout successfully');
  }

  get user() {
    return this.user$.asObservable();
  }

  register(user: any) {
    // make an api call to save user in db
    // update the user subject
    this.setUser(user);
    console.log('registered user successfully', user);
    return of(user);
  }

  private setUser(user: any) {
    this.user$.next(user);
  }
}
