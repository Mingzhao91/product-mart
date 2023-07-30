import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject, catchError, of, switchMap, throwError } from 'rxjs';

import { environment } from 'src/environments/environment.development';

import { User } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$ = new Subject<User>();
  private apiUri = environment.apiUri;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const loginCredentials = { email, password };
    console.log('login credentials: ', loginCredentials);
    return this.http.post<User>(`${this.apiUri}/login`, loginCredentials).pipe(
      switchMap((foundUser) => {
        this.setUser(foundUser);
        console.log(`user found: `, foundUser);
        return of(foundUser);
      }),
      catchError((error) => {
        return throwError(() => {
          console.log('login error: ', error);
          return new Error(
            `Your login details could not be verified. Please try again.`
          );
        });
      })
    );
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
    return this.http.post<User>(`${this.apiUri}/register`, user).pipe(
      switchMap((savedUser) => {
        this.setUser(savedUser);
        console.log('user registered successfully', savedUser);
        return of(savedUser);
      }),
      catchError((e) => {
        console.log('server error occurred', e);
        return throwError(() => e);
      })
    );

    // // make an api call to save user in db
    // // update the user subject
    // this.setUser(user);
    // console.log('registered user successfully', user);
    // return of(user);
  }

  private setUser(user: any) {
    this.user$.next(user);
  }
}
