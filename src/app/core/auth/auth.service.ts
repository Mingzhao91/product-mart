import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  BehaviorSubject,
  EMPTY,
  catchError,
  of,
  switchMap,
  throwError,
} from 'rxjs';

import { environment } from 'src/environments/environment.development';

import { User } from '@core/user.interface';
import { TokenStorageService } from '@core/auth/token-storage.service';

interface UserDto {
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$ = new BehaviorSubject<User | null>(null);
  private apiUri = environment.apiAuthUri;
  private redirectUrlAfterLogin = '';

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}

  get isUserLoggedIn() {
    return this.user$.value !== null;
  }

  get loggedInUser() {
    return this.user$.value;
  }

  set redirectUrl(url: string) {
    this.redirectUrlAfterLogin = url;
  }

  login(email: string, password: string) {
    const loginCredentials = { email, password };
    console.log('login credentials: ', loginCredentials);
    return this.http
      .post<UserDto>(`${this.apiUri}/login`, loginCredentials)
      .pipe(
        switchMap(({ user, token }) => {
          this.setUser(user);
          this.tokenStorageService.setToken(token);
          console.log(`user found: `, user);
          return of(this.redirectUrlAfterLogin);
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
    // remove token from localStorage
    this.tokenStorageService.removeToken();
    // remove user from subject
    this.setUser(null);
    console.log('user did logout successfully');
  }

  get user() {
    return this.user$.asObservable();
  }

  register(userToSave: User) {
    return this.http.post<UserDto>(`${this.apiUri}/register`, userToSave).pipe(
      switchMap(({ user, token }) => {
        console.log('user registered successfully', user);
        return this.setUserAfterUserFoundFromServer(user, token);
      }),
      catchError((e) => {
        console.log('server error occurred', e);
        return throwError(() => e);
      })
    );
  }

  findMe() {
    const token = this.tokenStorageService.getToken();
    if (!token) {
      return EMPTY;
    }
    return this.http.get<UserDto>(`${this.apiUri}/findme`).pipe(
      switchMap(({ user, token }) => {
        console.log(`user found: `, user);
        return this.setUserAfterUserFoundFromServer(user, token);
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

  private setUserAfterUserFoundFromServer(user: User, token: string) {
    this.setUser(user);
    this.tokenStorageService.setToken(token);
    return of(user);
  }

  private setUser(user: any) {
    if (user) {
      const newUser = { ...user, id: user._id };
      this.user$.next(newUser);
    } else {
      this.user$.next(null);
    }
  }
}
