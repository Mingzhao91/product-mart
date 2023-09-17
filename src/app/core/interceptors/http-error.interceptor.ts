import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptorService implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(this.showSnackBar));
  }

  private showSnackBar = (resp: HttpErrorResponse): Observable<any> => {
    const text = `Error Message: ${resp.message}`;

    if (text) {
      this.snackBar.open(text, 'Close', { duration: 7000 });
    }

    return throwError(() => new Error(text));
  };
}
