import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, of, switchMap, tap, throwError } from 'rxjs';

import { AuthService } from '@core/auth/auth.service';
import { CartItem } from '@core/cart/cart-item';
import { Order } from './order';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  submitOrder({
    cartId,
    paymentId,
    orderTotal,
    cartItems,
    shippingCost,
    itemsCount,
    estimatedTax,
    orderSubTotal,
  }: {
    cartId: string;
    paymentId: string;
    orderTotal: number;
    cartItems: CartItem[];
    shippingCost: number;
    itemsCount: number;
    estimatedTax: number;
    orderSubTotal: number;
  }) {
    // calculate shipping date
    const today = new Date();
    let after7Days = new Date();
    after7Days.setDate(today.getDate() + 7);

    // get logged in user
    const user = this.authService.loggedInUser;

    // create order object to save in db
    const order = new Order(
      user!.id,
      orderTotal,
      after7Days,
      user!.fullname as string,
      cartItems,
      cartId,
      paymentId,
      shippingCost,
      itemsCount,
      estimatedTax,
      orderSubTotal
    );

    // make http post call to submit order
    return this.http.post(`${environment.apiOrderUri}/submit`, order).pipe(
      tap((order: any) => {
        console.log('Order created successfully', order);
      }),
      switchMap((order: any) => of(order._id)),
      catchError((e) => {
        console.log(`Server Error Occurred: ${e.error.message}`, e);
        return throwError(
          () =>
            new Error('Your order could not be submitted now please try again')
        );
      })
    );
  }
}
