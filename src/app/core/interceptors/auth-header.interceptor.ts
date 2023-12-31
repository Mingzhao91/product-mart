import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { TokenStorageService } from '@core/auth/token-storage.service';

@Injectable()
export class AuthHeaderInterceptorService implements HttpInterceptor {
  constructor(private localStorageService: TokenStorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.localStorageService.getToken();
    const authReq = req.clone({
      headers: req.headers.set('Authorization', token ? `Bearer ${token}` : ''),
    });

    return next.handle(authReq);
  }
}
